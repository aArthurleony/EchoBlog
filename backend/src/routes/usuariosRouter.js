import { Router } from "express";
import {

  cadastrarUsuario,
  login,
} from "../controllers/usuarioController.js";

const router = Router();

router.post("/", cadastrarUsuario);
router.post("/login", login);


export default router;
