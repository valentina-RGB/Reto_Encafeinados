const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('productos', {
    idProducto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombreProducto: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    imagenProducto: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    categoria: {
      type: DataTypes.ENUM('Grano','Molido','Cápsula'),
      allowNull: true
    },
    origen: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nivelTostion: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    estadoProducto: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'productos',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idProducto" },
        ]
      },
    ]
  });
};
