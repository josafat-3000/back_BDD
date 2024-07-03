const express = require("express");
const router = express.Router();
const { practicas } = require("../../models");
const { validateToken, validateProfessorOrAdmin } = require("../middleware/auth");

// Añadir nueva práctica
router.post("/", validateToken, validateProfessorOrAdmin, async (req, res, next) => {
  try {
    const { tema_id, nombre_P, descripcion_P, calificacion, usuario_practica, profesor_practica } = req.body;
    const nuevaPractica = await practicas.create({
      tema_id,
      nombre_P,
      descripcion_P,
      calificacion,
      usuario_practica,
      profesor_practica
    });
    res.status(201).json(nuevaPractica);
  } catch (error) {
    next(error);
  }
});

// Editar detalles de una práctica
router.put("/:id", validateToken, validateProfessorOrAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tema_id, nombre_P, descripcion_P, calificacion, usuario_practica, profesor_practica } = req.body;
    const practica = await practicas.findByPk(id);
    if (!practica) {
      return res.status(404).json({ error: "Práctica no encontrada" });
    }
    practica.tema_id = tema_id;
    practica.nombre_P = nombre_P;
    practica.descripcion_P = descripcion_P;
    practica.calificacion = calificacion;
    practica.usuario_practica = usuario_practica;
    practica.profesor_practica = profesor_practica;
    await practica.save();
    res.status(200).json(practica);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const practica = await practicas.findByPk(req.params.id);
    if (!practica) {
      return res.status(404).json({ error: "Práctica no encontrada" });
    }
    await practica.update({ calificacion_P: req.body.calificacion });
    res.json(practica);
  } catch (error) {
    next(error);
  }
});

// Eliminar una práctica
router.delete("/:id", validateToken, validateProfessorOrAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const practica = await practicas.findByPk(id);
    if (!practica) {
      return res.status(404).json({ error: "Práctica no encontrada" });
    }
    await practica.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

// Listar todas las prácticas
router.get("/", validateToken, async (req, res, next) => {
  try {
    const practicasList = await practicas.findAll();
    res.status(200).json(practicasList);
  } catch (error) {
    next(error);
  }
});

// Listar todas las prácticas
router.get("/:id", validateToken, async (req, res, next) => {
  const { id } = req.params;
  try {
    const practicasList = await practicas.findAll({where: {
      usuario_practica: id,
    },});
    res.status(200).json({ list_prac: practicasList });
  } catch (error) {
    next(error);
  }
});

router.get("/by/:id", validateToken, async (req, res, next) => {
  const { id } = req.params;
  try {
    const practicasList = await practicas.findAll({where: {
      id_P: id,
    },});
    res.status(200).json(practicasList);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
