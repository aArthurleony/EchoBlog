import { Router } from "express";
import Imageupload from "../helpers/image-upload.js";
import {
  cadastrarUsuario,
  atualizarUsuario,
} from "../controllers/usuarioController.js";

const router = Router();

router.post("/", Imageupload.single("imagem"), cadastrarUsuario);
router.put("/:id", Imageupload.single("imagem"), atualizarUsuario);

export default router;
