import Usuario from "../models/usuariosModel.js";
import jwt from "jsonwebtoken";
import { z } from "zod";
import formatZodError from "../helpers/formatZodError.js";

const cadastroSchema = z.object({
  nome: z
    .string()
    .min(3, { message: "o nome deve ter pelo menos 3 caracteres" })
    .transform((txt) => txt.toLowerCase()),
  email: z
    .string()
    .min(3, { message: "o email deve ter pelo menos 3 caracteres" }),
  senha: z
    .string()
    .min(3, { message: "a senha deve ter pelo menos 3 caracteres" }),
});

const LoginSchema = z.object({
  email: z
    .string()
    .min(3, { message: "o email deve ter pelo menos 3 caracteres" }),
  senha: z
    .string()
    .min(3, { message: "a senha deve ter pelo menos 3 caracteres" }),
});

export const cadastrarUsuario = async (request, response) => {
  const bodyValidation = cadastroSchema.safeParse(request.body);
  if (!bodyValidation.success) {
    response.status(400).json({
      message: "os dados recebidos do corpo são inválidos",
      detalhes: bodyValidation.error,
    });
    return;
  }
  const { nome, email, senha, papel } = request.body;
  const novoUsuario = {
    nome,
    email,
    senha,
    papel,
  };
  try {
    await Usuario.create(novoUsuario);
    response.status(201).json({ message: "usuário cadastrado" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "erro ao cadastrar usuario" });
  }
};

export const login = async (request, response) => {
  const bodyValidation = LoginSchema.safeParse(request.body);
  if (!bodyValidation.success) {
    response.status(400).json({
      message: "os dados recebidos do corpo são inválidos",
      detalhes: bodyValidation.error,
    });
    return;
  }
  const { email, senha } = request.body;

  const usuario = await Usuario.findOne({
    raw: true,
    where: {
      email: email,
      senha: senha,
    },
  });
  try {
    const token = jwt.sign(
      {
        id: usuario.id,
        papel: usuario.papel,
      },
      process.env.senha_json
    );
    response
      .status(200)
      .json({ message: "login realizado com sucesso\n" + token });
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: "erro ao realizar login" });
    //* O sistema deve retornar um token de autenticação (JWT) para ser usado em requisições subsequentes.
  }
};
