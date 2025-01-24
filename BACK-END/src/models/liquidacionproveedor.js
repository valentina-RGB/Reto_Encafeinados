const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('liquidacionproveedor', {
    idLiquidacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idProveedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'proveedores',
        key: 'idProveedor'
      }
    },
    deudaActual: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      defaultValue: 0.00
    },
    estadoLiquidacion: {
      type: DataTypes.ENUM('PENDIENTE','PAGADA'),
      allowNull: false,
      defaultValue: "PENDIENTE"
    }
  }, {
    sequelize,
    tableName: 'liquidacionproveedor',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idLiquidacion" },
        ]
      },
      {
        name: "idProveedor",
        using: "BTREE",
        fields: [
          { name: "idProveedor" },
        ]
      },
    ]
  });
};
