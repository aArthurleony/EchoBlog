import { Router } from "express";

import { criarPostagem, ListarPostagens } from "../controllers/postagensController.js";

const router = Router();

router.post("/", criarPostagem);
router.get("/", ListarPostagens)

export default router