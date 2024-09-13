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
    .min(8, { message: "a senha deve ter pelo menos 8 caracteres" }),
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
  let imagem;
  if (request.file) {
    imagem = request.file.filename;
  } else {
    imagem = "usuarioDefault.png";
  }
  const novoUsuario = {
    nome,
    email,
    senha,
    imagem,
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
export const atualizarUsuario = async (request, response) => {
  // const paramValidator = getSchema.safeParse(request.params);
  // if (!paramValidator.success) {
  //   response.status(400).json({
  //     message: "numero de identicação está inválido",
  //     detalhes: formatZodError(paramValidator),
  //   });
  //   return;
  // }
  const updateValidator = updateSchema.safeParse(request.body);
  if (!updateValidator.success) {
    response.status(400).json({
      message: "dados para atualização estão incorretos",
      details: formatZodError(updateValidator.error),
    });
    return;
  }
  const { id } = request.params;
  const { nome, email, senha } = request.body;
  const usuarioAtualizado = {
    nome,
    email,
    senha,
  };
  try {
    const [linhasAfetadas] = await Usuario.update(usuarioAtualizado, {
      where: { id },
    });
    if (linhasAfetadas === 0) {
      response.status(404).json({ message: "usuario não encontrado" });
      return;
    }
    response.status(200).json({
      message: "usuario atualizado",
    });
  } catch (error) {
    response.status(500).json({ message: "erro ao atualizar usuario" });
  }
};
