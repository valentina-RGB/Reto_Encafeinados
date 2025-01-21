module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define('Roles', {
      ID_rol: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      descripcion: {
        type: DataTypes.STRING(100),
      },
      estado_rol: {
        type: DataTypes.CHAR(1),
        defaultValue: 'D',
        allowNull: false
      },
    }, {
      tableName: 'Roles',
      timestamps: false
    });
    
    return Roles;
  };