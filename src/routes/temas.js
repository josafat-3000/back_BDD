const express = require("express");
const router = express.Router();
const { temas } = require("../../models");
const { validateToken, validateProfessorOrAdmin } = require("../middleware/auth");

// Añadir nuevo tema
router.post("/", validateToken, validateProfessorOrAdmin, async (req, res, next) => {
  try {
    const { nombre_T, descripcion_T } = req.body;
    const nuevoTema = await temas.create({
      nombre_T,
      descripcion_T
    });
    res.status(201).json(nuevoTema);
  } catch (error) {
    next(error);
  }
});

// Editar detalles de un tema
router.put("/:id", validateToken, validateProfessorOrAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre_T, descripcion_T } = req.body;
    const tema = await temas.findByPk(id);
    if (!tema) {
      return res.status(404).json({ error: "Tema no encontrado" });
    }
    tema.nombre_T = nombre_T;
    tema.descripcion_T = descripcion_T;
    await tema.save();
    res.status(200).json(tema);
  } catch (error) {
    next(error);
  }
});

// Eliminar un tema
router.delete("/:id", validateToken, validateProfessorOrAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const tema = await temas.findByPk(id);
    if (!tema) {
      return res.status(404).json({ error: "Tema no encontrado" });
    }
    await tema.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Listar todos los temas
router.get("/", validateToken, async (req, res, next) => {
  try {
    const temasList = await temas.findAll();
    res.status(200).json(temasList);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
