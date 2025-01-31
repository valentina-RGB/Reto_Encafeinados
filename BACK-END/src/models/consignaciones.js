const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('consignaciones', {
    idConsignacion: {
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
    fechaIngreso: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    fechaDevolucion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    cantidadTotalVendida: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    cantidadTotalDevuelta: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    estadoConsignacion: {
      type: DataTypes.ENUM('ACTIVA','FINALIZADA','DEVUELTA'),
      allowNull: false,
      defaultValue: "ACTIVA"
    }
  }, {
    sequelize,
    tableName: 'consignaciones',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idConsignacion" },
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
