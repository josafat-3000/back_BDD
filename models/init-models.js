var DataTypes = require("sequelize").DataTypes;
var _escuelas = require("./escuelas");
var _practicas = require("./practicas");
var _rol = require("./rol");
var _temas = require("./temas");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var escuelas = _escuelas(sequelize, DataTypes);
  var practicas = _practicas(sequelize, DataTypes);
  var rol = _rol(sequelize, DataTypes);
  var temas = _temas(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  usuario.belongsTo(escuelas, { as: "id_escuela_U_escuela", foreignKey: "id_escuela_U"});
  escuelas.hasMany(usuario, { as: "usuarios", foreignKey: "id_escuela_U"});
  usuario.belongsTo(rol, { as: "rol_rol", foreignKey: "rol"});
  rol.hasMany(usuario, { as: "usuarios", foreignKey: "rol"});
  practicas.belongsTo(temas, { as: "tema", foreignKey: "tema_id"});
  temas.hasMany(practicas, { as: "practicas", foreignKey: "tema_id"});
  practicas.belongsTo(usuario, { as: "usuario_practica_usuario", foreignKey: "usuario_practica"});
  usuario.hasMany(practicas, { as: "practicas", foreignKey: "usuario_practica"});
  practicas.belongsTo(usuario, { as: "profesor_practica_usuario", foreignKey: "profesor_practica"});
  usuario.hasMany(practicas, { as: "profesor_practica_practicas", foreignKey: "profesor_practica"});

  return {
    escuelas,
    practicas,
    rol,
    temas,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
