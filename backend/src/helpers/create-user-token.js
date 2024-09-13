import jwt from "jsonwebtoken";

const createUserToken = async (usuario, request, response) => {
  //* criar o token
  const token = jwt.sign({
    nome: usuario.nome,
    id: usuario.id,
  });
  //*retornar o token
  response.status(200).json({
    message: "você está logado",
    token: token,
    usuarioId: usuario.id,
  });
};

export default createUserToken;
