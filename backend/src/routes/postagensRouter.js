import { Router } from "express";

import { criarPostagem } from "../controllers/postagensController.js";

const router = Router();

router.post("/", criarPostagem);
