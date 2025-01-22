const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tiendas', {
    idTienda: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuarios',
        key: 'idUsuario'
      },
      unique: "tiendas_ibfk_1"
    },
    nombreTienda: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    correoTienda: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    telefonoTienda: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    direccionTienda: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'tiendas',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idTienda" },
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
    ]
  });
};
