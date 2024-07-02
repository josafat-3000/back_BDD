const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('escuelas', {
    clave_E: {
      type: DataTypes.STRING(6),
      allowNull: false,
      primaryKey: true
    },
    nombre_E: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'escuelas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "clave_E" },
        ]
      },
    ]
  });
};
