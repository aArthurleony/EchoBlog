import { Router } from "express";
import {
  cadastrarUsuario,
  atualizarUsuario,
} from "../controllers/usuarioController.js";

const router = Router();

router.post("/", cadastrarUsuario);
router.put("/:id", atualizarUsuario);

export default router;
