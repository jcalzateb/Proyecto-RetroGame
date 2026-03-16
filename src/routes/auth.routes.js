import { Router } from "express";
import {
  registrarUsuario,
  iniciar_Sesion,
} from "../controllers/auth.controllers.js";

const router = Router();

router.post("/register", registrarUsuario);
router.post("/login", iniciar_Sesion);

export default router;
