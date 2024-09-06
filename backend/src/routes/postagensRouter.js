import { Router } from "express";
import upload from "../helpers/uploadMiddleware.js";
import {
  AtualizarPostagem,
  criarPostagem,
  DeletarPostagem,
  ListarPostagens,
  ListarUnicaPostagem,
  UploadImagem,
} from "../controllers/postagensController.js";

const router = Router();

router.post("/", criarPostagem);
router.get("/", ListarPostagens);
router.get("/:id", ListarUnicaPostagem);
router.put("/:id", AtualizarPostagem);
router.delete("/:id", DeletarPostagem);
router.post("/:id/imagem", upload.single("imagem"), UploadImagem);

export default router;
