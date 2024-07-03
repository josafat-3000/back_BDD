const express = require("express");
const router = express.Router();
const { usuario } = require("../../models");
const bcrypt = require("bcryptjs");
const { validateToken } = require("../middleware/auth");
const { sign } = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// Ruta para registrar un nuevo usuario
router.post("/", async (req, res, next) => {
  try {
    const { nombre, correo, password, id_esc, rol } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await usuario.create({
      id_U: uuidv4(),
      nombre_U: nombre,
      correo_U: correo,
      contrasena_U: hashedPassword,
      id_escuela_U: id_esc,
      rol: rol
    });

    res.status(201).json("SUCCESS");
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Este correo electrónico ya está registrado' });
    } else {
      next(error);
    }
  }
});

// Ruta para iniciar sesión
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await usuario.findOne({ where: { correo_U: email } });

    if (!user) return res.status(404).json({ error: "User Doesn't Exist" });

    const match = await bcrypt.compare(password, user.contrasena_U);
    if (!match) return res.status(401).json({ error: "Wrong Username And Password Combination" });

    const accessToken = sign(
      { username: user.correo_U, id: user.id_U },
      "importantsecret"
    );
    res.json({ token: accessToken, correo: user.correo_U, id: user.id_U, rol: user.rol });
  } catch (error) {
    console.log(error)
    next(error);
  }
});

// Ruta para verificar el token de autenticación
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

// Ruta para obtener información básica del usuario
router.get("/basicinfo/:id", validateToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const basicInfo = await usuario.findByPk(id, {
      attributes: { exclude: ["contrasena_U"] },
    });
    res.json(basicInfo);
  } catch (error) {
    next(error);
  }
});

// Ruta para cambiar la contraseña del usuario
router.put("/changepassword", validateToken, async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await usuario.findOne({ where: { id_U: req.user.id } });

    const match = await bcrypt.compare(oldPassword, user.contrasena_U);
    if (!match) return res.status(401).json({ error: "Wrong Password Entered!" });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await usuario.update(
      { contrasena_U: hashedNewPassword },
      { where: { id_U: req.user.id } }
    );
    res.json("SUCCESS");
  } catch (error) {
    next(error);
  }
});

// Ruta para actualizar información del usuario
router.put("/updateinfo/:id", validateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre_U, correo_U, id_escuela_U } = req.body;
    const user = await usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    user.nombre_U = nombre_U;
    user.correo_U = correo_U;
    user.id_escuela_U = id_escuela_U;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// Ruta para obtener todos los usuarios con rol de alumno (rol == 3)
router.get("/students", validateToken, async (req, res, next) => {
  try {
    const students = await usuario.findAll({ where: { rol: 3 } });
    res.json(students);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:id", async (req, res, next) => {
  try {
    const user = await usuario.findByPk(req.params.id, {
      attributes: { exclude: ["contrasena_U"] }, // Excluimos la contraseña por seguridad
    });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Ruta para actualizar información del usuario por ID
router.patch("/user/:id", async (req, res, next) => {
  try {
    const user = await usuario.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
