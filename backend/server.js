import "dotenv/config";
import express, { response } from "express";
import cors from "cors";

//*conexão com o banco de dados
import conn from "./src/config/conn";

//*importar o model

//*importar as rotas

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


app.use((request, response)=>{
    response.status(404).json({message: "Rota não encontrada"})
})

//*primeiro cria a rota, dps o controlador
