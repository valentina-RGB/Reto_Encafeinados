const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('perfilsensorial', {
    idPerfilSensorial: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idProducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'productos',
        key: 'idProducto'
      }
    },
    aroma: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    acidez: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    cuerpo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    notasSabor: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'perfilsensorial',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idPerfilSensorial" },
        ]
      },
      {
        name: "idProducto",
        using: "BTREE",
        fields: [
          { name: "idProducto" },
        ]
      },
    ]
  });
};
