import { Router } from "express";
import {
  registrarUsuario,
  iniciar_Sesion,
  obtenerUsuarios,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/auth.controllers.js";
import { verificarToken } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registrarUsuario);
router.post("/login", iniciar_Sesion);
router.get("/usuarios", verificarToken, obtenerUsuarios);
router.put("/usuarios/:id", verificarToken, actualizarUsuario);
router.delete("/usuarios/:id", verificarToken, eliminarUsuario);

export default router;
