const express = require("express");
const router = express.Router();
const { usuario } = require("../../models");
const bcrypt = require("bcryptjs");
const { validateToken } = require("../middleware/auth");
const { sign } = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

router.post("/", async (req, res) => {
   try {
    const { nombre, correo, password, id_esc, rol } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await usuario.create({
      id_U: uuidv4(),
      nombre_U: nombre,
      correo_U: correo,
      contrasena_U:hashedPassword,  // Asegúrate de que la contraseña esté hasheada antes de guardarla
      id_escuela_U:id_esc,
      rol: rol
    });

    res.status(201).json("SUCCESS");
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Este correo electrónico ya está registrado' });
    } else {
      res.status(500).json({ error: 'Error al registrar usuario' });
    }
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await usuario.findOne({ where: { correo_U: email } });
  console.log(user)

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.contrasena_U).then(async (match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    const accessToken = sign(
      { username: user.correo_U, id: user.id_U },
      "importantsecret"
    );
    res.json({ token: accessToken, correo: user.correo_U, id: user.id });
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

// router.get("/basicinfo/:id", async (req, res) => {
//   const id = req.params.id;

//   const basicInfo = await usuario.findByPk(id, {
//     attributes: { exclude: ["password"] },
//   });

//   res.json(basicInfo);
// });

// router.put("/changepassword", validateToken, async (req, res) => {
//   const { oldPassword, newPassword } = req.body;
//   const user = await usuario.findOne({ where: { username: req.user.username } });

//   bcrypt.compare(oldPassword, user.password).then(async (match) => {
//     if (!match) res.json({ error: "Wrong Password Entered!" });

//     bcrypt.hash(newPassword, 10).then((hash) => {
//       usuario.update(
//         { password: hash },
//         { where: { username: req.user.username } }
//       );
//       res.json("SUCCESS");
//     });
//   });
// });

module.exports = router;