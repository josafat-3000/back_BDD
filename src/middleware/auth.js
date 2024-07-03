const { verify } = require("jsonwebtoken");
const { usuario } = require("../../models");

const validateToken = (req, res, next) => {
  
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.status(401).json({ error: "User not authenticated!" });

  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken;
    console.log(req.user)

    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.status(401).json({ error: err });
  }
};

const validateAdmin = async (req, res, next) => {
  try {
    const user = await usuario.findByPk(req.user.id);
    if (user && user.rol === 1) { // Asumiendo que el rol 1 es para administradores
      return next();
    }
    return res.status(403).json({ error: "Access denied, administrator only" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

const validateProfessorOrAdmin = async (req, res, next) => {
  try {
    const user = await usuario.findByPk(req.user.id);
    if (user && (user.rol === 1 || user.rol === 2)) { // Asumiendo que el rol 1 es para administradores y el rol 2 es para profesores
      return next();
    }
    return res.status(403).json({ error: "Access denied, professor or administrator only" });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

module.exports = { validateToken, validateAdmin, validateProfessorOrAdmin };
