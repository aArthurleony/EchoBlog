import Postagem from "../models/postagensModel.js";
import { z } from "zod";
import formatZodError from "../helpers/formatZodError.js";

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
    response.status(201).json({message: "postagem criada"})
  } catch (error) {
    console.error(error)
    response.status(500).json({error: "erro ao cadastrar postagem"})
  }
};
