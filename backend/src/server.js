import "dotenv/config";
import express from "express";
import cors from "cors";

//*conexão com o banco de dados
import conn from "./config/conn.js";

//*importar as rotas
import postagensRouter from "./routes/postagensRouter.js";
import usuariosRouter from "./routes/usuariosRouter.js";

const PORT = process.env.PORT || 3333;
const app = express();

//*3 middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//*conexão com o banco

conn
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor on PORT${PORT}`);
    });
  })
  .catch((error) => console.error(error));

//*utilizar as rotas
app.use("/postagens", postagensRouter);
app.use("/usuarios", usuariosRouter);

app.use((request, response) => {
  response.status(404).json({ message: "Rota não encontrada" });
});

//*primeiro cria a rota, dps o controlador
