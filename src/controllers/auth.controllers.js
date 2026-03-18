import usuarios from "../models/model.usuarios.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registrarUsuario = async (req, res) => {
  try {
    const { usuario, email, password } = req.body;

    // Verificamos si el correo ya existe
    const existe = await usuarios.findOne({ email });
    if (existe) {
      return res.status(400).json({
        message: "Usuario Registrado",
      });
    }
    //*
    const hash = await bcrypt.hash(password, 10);
    const nuevo_usuario = new usuarios({
      usuario,
      email,
      password: hash,
    });

    await nuevo_usuario.save();

    res.status(201).json({
      message: "Usuario Registrado Correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error de registro en servidor",
      error,
    });
  }
};

export const iniciar_Sesion = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await usuarios.findOne({ email });
    if (!usuario) {
      return res.status(401).json({
        message: "Usuario No encontrado",
      });
    }

    // comprobar contraseña
    const existe = await bcrypt.compare(password, usuario.password);
    if (!existe) {
      return res.status(401).json({
        message: "Contraseña Invalida",
      });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Inicio de sesion exitoso",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "error del servidor",
      error,
    });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const listaUsuarios = await usuarios.find({}, { password: 0 });
    res.json(listaUsuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { usuario, telefono, direccion, rol } = req.body;

    const usuarioActualizado = await usuarios.findByIdAndUpdate(
      req.params.id,
      { usuario, telefono, direccion, rol },
      { returnDocument: "after" }, // Para que nos devuelva ya actualizado
    );
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    await usuarios.findByIdAndDelete(req.params.id);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};
