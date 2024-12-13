import express from "express";
import Profesional from "../models/Profesional.js";
import Usuario from "../models/Usuario.js";
import Sesion from "../models/Sesion.js";
import moment from "moment";

import bcrypt from "bcryptjs";
import generateToken from "../libs/jwt.js";
import authRequired from "../middlewares/authRequired.js";

const router = express.Router();

// Autenticación

router.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    const verificarExistente = await Profesional.findOne({ email });

    if (verificarExistente) {
      return res
        .status(409)
        .json({ message: "El correo electrónico ya está registrado" });
    } else {
      const passwordHash = await bcrypt.hash(password, 10);

      const nuevoProfesional = new Profesional({
        nombre,
        email,
        password: passwordHash,
      });

      await nuevoProfesional.save();

      res
        .status(200)
        .json({ message: "El profesional se ha agregado con éxito" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al registrar al profesional" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Profesional.findOne({ email });

    if (!user) {
      return res.status(409).json({
        message:
          "No existe ningún usuario registrado con ese correo electrónico",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(409).json({ message: "Contraseña inválida" });
    }

    const token = await generateToken(user);

    res.cookie("token", token);

    res
      .status(200)
      .json({ message: "El profesional se ha logueado con éxito" });
  } catch (err) {
    console.log(err);
    res.json({ message: "No se ha podido realizar el inicio de sesión." });
  }
});

router.get("/user-info", authRequired, async (req, res) => {
  try {
    const user = await Profesional.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("Error al obtener la información del usuario", err);
    return res
      .status(401)
      .json({ message: "Error obteniendo la información del usuario" });
  }
});

router.get("/logout", async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Sesión cerrada" });
});

// Agregar información a la BD

router.post("/agregar-profesional", async (req, res) => {
  const { nombre } = req.body;

  const nuevoProfesional = new Profesional({
    nombre,
  });

  await nuevoProfesional.save();

  res.json(nuevoProfesional);
});

router.post("/agregar-usuario", async (req, res) => {
  const { nombre, apoderado } = req.body;

  const nuevoUsuario = new Usuario({
    nombre,
    apoderado,
  });

  await nuevoUsuario.save();

  res.status(200).json("Usuario agregado con éxito");
});

router.post("/agregar-sesion", async (req, res) => {
  const { fecha, usuarioId, profesionalId, tipoDeSesion, boleta } = req.body;

  const fechaValida = new Date(fecha);

  const nuevaSesion = new Sesion({
    tipo: tipoDeSesion,
    fecha: fechaValida,
    boleta,
    pagadoDivergente: false,
    pagadoProfesional: false,
    profesional: profesionalId,
    usuario: usuarioId,
  });

  await nuevaSesion.save();

  return res
    .status(200)
    .json("Los datos de la sesión se han guardado exitosamente.");
});

// Buscar información en la BD

router.get("/sesiones/", async (req, res) => {
  const { month, year } = req.query;

  const yearNumber = parseInt(year);

  const monthNumber = parseInt(month);

  console.log(yearNumber, monthNumber);

  if (isNaN(monthNumber) || monthNumber < 0 || monthNumber > 11) {
    return res.status(400).json({ error: "Mes no válido" });
  }

  const startOfMonth = moment
    .utc()
    .year(yearNumber)
    .month(monthNumber)
    .startOf("month")
    .toDate();

  const endOfMonth = moment
    .utc()
    .year(yearNumber)
    .month(monthNumber)
    .endOf("month")
    .toDate();

  const sesiones = await Sesion.find({
    fecha: {
      $gte: startOfMonth,
      $lte: endOfMonth,
    },
  })
    .sort({ profesional: 1, fecha: 1 })
    .populate("usuario profesional");

  return res.status(200).json(sesiones);
});

router.get("/sesiones/:id", async (req, res) => {
  const { id } = req.params;
  let { month, year, tipoDeSesion } = req.query;

  if (tipoDeSesion !== "Evaluación") {
    tipoDeSesion = { $in: ["Aseo", "Atención"] };
  }

  const yearNumber = parseInt(year);

  const monthNumber = parseInt(month);

  if (isNaN(monthNumber) || monthNumber < 0 || monthNumber > 11) {
    return res.status(400).json({ error: "Mes no válido" });
  }

  const startOfMonth = moment
    .utc()
    .year(yearNumber)
    .month(monthNumber)
    .startOf("month")
    .toDate();

  const endOfMonth = moment
    .utc()
    .year(yearNumber)
    .month(monthNumber)
    .endOf("month")
    .toDate();

  const sesiones = await Sesion.find({
    profesional: id,
    fecha: {
      $gte: startOfMonth,
      $lte: endOfMonth,
    },
    tipo: tipoDeSesion,
  })
    .sort({ fecha: 1 })
    .populate("usuario profesional");

  return res.status(200).json(sesiones);
});

router.put("/sesiones/:id", async (req, res) => {
  const { id } = req.params;
  const { pagadoProfesional, pagadoDivergente } = req.body;

  await Sesion.findOneAndUpdate(
    { _id: id },
    { pagadoProfesional, pagadoDivergente }
  );

  return res
    .status(200)
    .json("Los datos de la sesión se han guardado exitosamente.");
});

router.get("/usuarios", async (req, res) => {
  const usuarios = await Usuario.find();
  return res.status(200).json(usuarios);
});

router.get("/user-data/:id", async (req, res) => {
  const { id } = req.params;
  const user = await Usuario.findOne({ _id: id });
  return res.status(200).json(user);
});

router.get("/user-info/:id", async (req, res) => {
  const { id } = req.params;
  const { month, year } = req.query;

  const yearNumber = parseInt(year);

  const monthNumber = parseInt(month);

  if (isNaN(monthNumber) || monthNumber < 0 || monthNumber > 11) {
    return res.status(400).json({ error: "Mes no válido" });
  }

  const startOfMonth = moment()
    .year(yearNumber)
    .month(monthNumber)
    .startOf("month")
    .toDate();
  const endOfMonth = moment()
    .year(yearNumber)
    .month(monthNumber)
    .endOf("month")
    .toDate();

  const sesionesDelUsuario = await Sesion.find({
    usuario: id,
    fecha: { $gte: startOfMonth, $lte: endOfMonth },
  })
    .populate("profesional usuario")
    .sort({ fecha: 1 });
  return res.status(200).json(sesionesDelUsuario);
});

// Editar y eliminar sesiones
router.delete("/sesiones/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Sesion.deleteOne({ _id: id });
  } catch (err) {
    console.error("Error al eliminar sesión:", err);
  }

  return res
    .status(200)
    .json({ message: "La sesión fue eliminada correctamente" });
});

export default router;
