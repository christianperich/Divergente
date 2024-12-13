import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.nombre,
    email: user.email,
    role: user.role,
  };

  const secret = process.env.TOKEN_SECRET;

  if (!secret) {
    throw new Error("La llave secreta de JWT no está definida");
  }

  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};

export default generateToken;
