const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roles', {
    idRol: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombreRol: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "nombreRol"
    },
    estadoRol: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'roles',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idRol" },
        ]
      },
      {
        name: "nombreRol",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nombreRol" },
        ]
      },
    ]
  });
};
