import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Token requerido",
    });
  }

  const tokenLimpio = token.replace("Bearer ", "");

  try {
    const codigo = jwt.verify(tokenLimpio, process.env.JWT_SECRET);
    req.usuario = codigo;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Token Invalido",
      error,
    });
  }
};
