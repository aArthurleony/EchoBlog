import { Router } from "express";

import {
  AtualizarPostagem,
  criarPostagem,
  ListarPostagens,
  ListarUnicaPostagem,
} from "../controllers/postagensController.js";

const router = Router();

router.post("/", criarPostagem);
router.get("/", ListarPostagens);
router.get("/:id", ListarUnicaPostagem);
router.put("/:id", AtualizarPostagem);

export default router;
