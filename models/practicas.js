const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('practicas', {
    id_P: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tema_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'temas',
        key: 'id_T'
      }
    },
    nombre_P: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    descripcion_P: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    calificacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    usuario_practica: {
      type: DataTypes.STRING(36),
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'id_U'
      }
    },
    profesor_practica: {
      type: DataTypes.STRING(36),
      allowNull: true,
      references: {
        model: 'usuario',
        key: 'id_U'
      }
    }
  }, {
    sequelize,
    tableName: 'practicas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_P" },
        ]
      },
      {
        name: "tema_id",
        using: "BTREE",
        fields: [
          { name: "tema_id" },
        ]
      },
      {
        name: "usuario_practica",
        using: "BTREE",
        fields: [
          { name: "usuario_practica" },
        ]
      },
      {
        name: "profesor_practica",
        using: "BTREE",
        fields: [
          { name: "profesor_practica" },
        ]
      },
    ]
  });
};
