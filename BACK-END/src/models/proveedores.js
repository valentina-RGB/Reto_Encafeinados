const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proveedores', {
    idProveedor: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'idUsuario'
      },
      unique: "proveedores_ibfk_1"
    },
    nombreProveedor: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    correoProveedor: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    telefonoProveedor: {
      type: DataTypes.STRING(12),
      allowNull: true,
      unique: "telefonoProveedor"
    },
    direccionProveedor: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    bancoProveedor: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    tipoCuenta: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    numeroCuenta: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "numeroCuenta"
    },
    estadoProveedor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'proveedores',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProveedor" },
        ]
      },
      {
        name: "idUsuario",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
        ]
      },
      {
        name: "telefonoProveedor",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "telefonoProveedor" },
        ]
      },
      {
        name: "numeroCuenta",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "numeroCuenta" },
        ]
      },
    ]
  });
};
