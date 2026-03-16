import { Router } from "express";
import {
  getProductos,
  crearProducto,
  eliminarProducto,
  actualizarProducto,
} from "../controllers/producto.controllers.js";
import { verificarToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getProductos);

router.post("/", verificarToken, crearProducto);
router.delete("/:id", verificarToken, eliminarProducto);
router.put("/:id", verificarToken, actualizarProducto);

export default router;
