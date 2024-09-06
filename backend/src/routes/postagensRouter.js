import { Router } from "express";

import { criarPostagem, ListarPostagens, ListarUnicaPostagem } from "../controllers/postagensController.js";

const router = Router();

router.post("/", criarPostagem);
router.get("/", ListarPostagens)
router.get("/:id", ListarUnicaPostagem)

export default router