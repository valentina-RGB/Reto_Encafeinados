const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('abonoproveedor', {
    idAbono: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idLiquidacionProveedor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'liquidacionproveedor',
        key: 'idLiquidacion'
      }
    },
    fechaPago: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    monto: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    metodoPago: {
      type: DataTypes.ENUM('EFECTIVO','TRANSFERENCIA'),
      allowNull: false
    },
    referencia: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'abonoproveedor',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idAbono" },
        ]
      },
      {
        name: "idLiquidacionProveedor",
        using: "BTREE",
        fields: [
          { name: "idLiquidacionProveedor" },
        ]
      },
    ]
  });
};
