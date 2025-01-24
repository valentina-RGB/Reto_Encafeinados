const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('movimientos', {
    idMovimiento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipoMovimiento: {
      type: DataTypes.ENUM('Venta','Devolución','Ajuste'),
      allowNull: false
    },
    fechaMovimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    motivoMovimiento: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    estadoMovimiento: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'movimientos',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idMovimiento" },
        ]
      },
    ]
  });
};
