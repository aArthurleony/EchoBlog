import { Router } from "express";
import { cadastrarUsuario } from "../controllers/usuarioController.js";
import Imageupload from "../helpers/image-upload.js";

const router = Router();

router.post("/", Imageupload.single("imagem"), cadastrarUsuario);

export default router;
