import Producto from "../models/model.productos.js";

export const getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener productos" });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();

    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear producto" });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar producto" });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar producto" });
  }
};
