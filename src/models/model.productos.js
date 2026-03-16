import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  plataforma: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  tipo: String,
  categoria: String,
  stock: { type: Number, default: 1 },
});

export default mongoose.model("Producto", productoSchema);
