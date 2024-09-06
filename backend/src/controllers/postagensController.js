import Postagem from "../models/postagensModel.js";
import { z } from "zod";
import formatZodError from "../helpers/formatZodError.js";
import { response } from "express";

const createSchema = z.object({
  titulo: z
    .string()
    .min(3, { message: "o titulo deve ter pelo menos 3 caracteres" })
    .transform((txt) => txt.toLowerCase()),
  conteudo: z
    .string()
    .min(3, { message: "o conteúdo deve ter pelo menos 3 caracteres" }),
});
//*importar o helpers zod para a validação

export const criarPostagem = async (request, response) => {
  const bodyValidation = createSchema.safeParse(request.body);
  if (!bodyValidation.success) {
    response.status(400).json({
      message: "os dados recebidos do corpo da aplicação são inválidos",
      detalhes: bodyValidation.error,
    });
    return;
  }
  const { titulo, conteudo, dataPublicacao, autor, imagem } = request.body;
  const novaPostagem = {
    titulo,
    conteudo,
    dataPublicacao,
    autor,
    imagem,
  };
  try {
    await Postagem.create(novaPostagem);
    response.status(201).json({ message: "postagem criada" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "erro ao cadastrar postagem" });
  }
};

export const ListarPostagens = async (request, response) => {
  const page = parseInt(request.query.page) || 1;
  const limit = parseInt(request.query.limit) || 10;
  const offset = (page - 1) * 10;
  try {
    const postagens = await Postagem.findAndCountAll({
      limit,
      offset,
    });
    const totalPaginas = Math.ceil(postagens.count / limit);
    response.status(200).json({
      totalPostagens: postagens.count,
      totalPaginas,
      paginaAtual: page,
      itemsPorPagina: limit,
      proximaPagina:
        totalPaginas === 0
          ? null
          : `http://localhost:3333/postagens?page=${page + 1}`,
      postagens: postagens.rows
    });
  } catch (error) {
    console.error(error)
    response.status(500).json({error: "erro ao buscar postagens"})
  }
};
