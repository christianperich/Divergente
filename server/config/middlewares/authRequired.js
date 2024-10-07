import jwt from "jsonwebtoken";

const authRequired = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso no autorizado, se requiere autenticación" });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido o expirado" });
    }

    req.user = user;
    next();
  });
};

export default authRequired;
