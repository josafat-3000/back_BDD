const express = require("express");
const router = express.Router();
const { rol } = require("../../models");

  
router.get('/', async (req, res) => {
    try {
      const roles = await rol.findAll();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching schools' });
    }
  });

module.exports = router;