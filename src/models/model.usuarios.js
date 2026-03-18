import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  telefono: { type: String, default: "" },
  direccion: { type: String, default: "" },
  rol: { type: String, default: "Admin" },
});

export default mongoose.model("usuarios", usuarioSchema);
