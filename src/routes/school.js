const express = require("express");
const router = express.Router();
const { escuelas } = require("../../models");

  
router.get('/', async (req, res) => {
    try {
      const schools = await escuelas.findAll();
      res.json(schools);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching schools' });
    }
  });

module.exports = router;