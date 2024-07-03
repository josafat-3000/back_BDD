const express = require("express");
const router = express.Router();
const { escuelas } = require("../../models");
const { validateToken, validateAdmin } = require("../middleware/auth");

// Añadir nueva escuela
router.post("/", validateToken, validateAdmin, async (req, res, next) => {
  try {
    const { clave, nombre } = req.body;
    const nuevaEscuela = await escuelas.create({
      clave_E: clave,
      nombre_E: nombre
    });
    res.status(201).json(nuevaEscuela);
  } catch (error) {
    next(error);
  }
});

// Editar detalles de una escuela
router.put("/:clave", validateToken, validateAdmin, async (req, res, next) => {
  try {
    const { clave } = req.params;
    const { nombre, direccion } = req.body;
    const escuela = await escuelas.findByPk(clave);
    if (!escuela) {
      return res.status(404).json({ error: "Escuela no encontrada" });
    }
    escuela.nombre_E = nombre;
    escuela.direccion_E = direccion;
    await escuela.save();
    res.status(200).json(escuela);
  } catch (error) {
    next(error);
  }
});

// Eliminar una escuela
router.delete("/:clave", validateToken, validateAdmin, async (req, res, next) => {
  try {
    const { clave } = req.params;
    const escuela = await escuelas.findByPk(clave);
    if (!escuela) {
      return res.status(404).json({ error: "Escuela no encontrada" });
    }
    await escuela.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Listar todas las escuelas
router.get("/", async (req, res, next) => {
  try {
    const escuelasList = await escuelas.findAll();
    res.status(200).json(escuelasList);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
