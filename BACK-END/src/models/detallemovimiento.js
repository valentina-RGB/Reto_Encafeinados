const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('detallemovimiento', {
    idDetalleMovimiento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idMovimiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'movimientos',
        key: 'idMovimiento'
      }
    },
    idDetalleConsignacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'detalleconsignacion',
        key: 'idDetalleConsignacion'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precioCompra: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    precioVenta: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'detallemovimiento',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idDetalleMovimiento" },
        ]
      },
      {
        name: "idMovimiento",
        using: "BTREE",
        fields: [
          { name: "idMovimiento" },
        ]
      },
      {
        name: "idDetalleConsignacion",
        using: "BTREE",
        fields: [
          { name: "idDetalleConsignacion" },
        ]
      },
    ]
  });
};
