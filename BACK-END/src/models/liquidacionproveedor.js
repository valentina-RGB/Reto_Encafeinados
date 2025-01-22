const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('liquidacionproveedor', {
    idLiquidacion: {
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
    estadoLiquidacion: {
      type: DataTypes.ENUM('PENDIENTE','PAGADA'),
      allowNull: false
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
        name: "idConsignacion",
        using: "BTREE",
        fields: [
          { name: "idConsignacion" },
        ]
      },
    ]
  });
};
