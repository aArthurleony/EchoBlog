import Usuario from "../models/usuariosModel.js";
import bcrypt from "bcrypt";
import { z } from "zod";
import formatZodError from "../helpers/formatZodError.js";
import createUserToken from "../helpers/create-user-token.js";

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
const updateSchema = z.object({
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
  const bodyValidation = cadastroSchema.safeParse(request.body);
  if (!bodyValidation.success) {
    response.status(400).json({
      message: "os dados recebidos do corpo são inválidos",
      detalhes: bodyValidation.error,
    });
    return;
  }
  const { nome, email, senha } = request.body;

  const usuario = data[0];
  const compareSenha = await bcrypt.compare(senha, usuario.senha);
  if (!compareSenha) {
    return response.status(401).json({ message: "senha inválida" });
  }
  try {
    await createUserToken(usuario, request, response);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "erro ao processar informação" });
  }
};

export const atualizarUsuario = async (request, response) => {
  const paramValidator = getSchema.safeParse(request.params);
  if (!paramValidator.success) {
    response.status(400).json({
      message: "numero de identicação está inválido",
      detalhes: formatZodError(paramValidator),
    });
    return;
  }
  const updateValidator = updateSchema.safeParse(request.body);
  if (!updateValidator.success) {
    response.status(400).json({
      message: "dados par atualização estão incorretos",
      details: formatZodError(updateValidator.error),
    });
    return;
  }
};
