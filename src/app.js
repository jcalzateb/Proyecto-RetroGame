import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { conectar } from "./config/db.js";
import productoRoutes from "./routes/producto.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js";

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/productos", productoRoutes);
app.use("/api/auth", authRoutes);

conectar();

/* app.get("/", (req, res) => {
  res.send("API funcionando");
}); */

const port = process.env.PORT || 3000;

app.listen(port || 3000, () => {
  console.log(`Servidor en http://localhost:${port || 3000}`);
});

export default app;
