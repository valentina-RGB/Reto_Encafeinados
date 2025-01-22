const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('detalleconsignacion', {
    idDetalleConsignacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idConsignacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'consignaciones',
        key: 'idConsignacion'
      }
    },
    idVarianteProducto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'varianteproducto',
        key: 'idVariante'
      }
    },
    cantidadRecibida: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidadVendida: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    cantidadDevuelta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    fechaTostion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    precioCompra: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    porcentajeGanancia: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    },
    precioVenta: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    subtotal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'detalleconsignacion',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idDetalleConsignacion" },
        ]
      },
      {
        name: "idConsignacion",
        using: "BTREE",
        fields: [
          { name: "idConsignacion" },
        ]
      },
      {
        name: "idVarianteProducto",
        using: "BTREE",
        fields: [
          { name: "idVarianteProducto" },
        ]
      },
    ]
  });
};
