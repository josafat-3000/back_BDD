const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    id_U: {
      type: DataTypes.STRING(36),
      allowNull: false,
      primaryKey: true
    },
    nombre_U: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    correo_U: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "unique_email"
    },
    contrasena_U: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    id_escuela_U: {
      type: DataTypes.STRING(6),
      allowNull: true,
      references: {
        model: 'escuelas',
        key: 'clave_E'
      }
    },
    rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'rol',
        key: 'id_rol'
      }
    }
  }, {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_U" },
        ]
      },
      {
        name: "unique_email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "correo_U" },
        ]
      },
      {
        name: "rol",
        using: "BTREE",
        fields: [
          { name: "rol" },
        ]
      },
      {
        name: "id_escuela_U",
        using: "BTREE",
        fields: [
          { name: "id_escuela_U" },
        ]
      },
    ]
  });
};
