'use strict';

const fs = require('fs');
const path = require('path');
const { sequelize } = require('../config/db');  // Importa la instancia existente de Sequelize
const Sequelize = require('sequelize');  // Opcional, solo si necesitas la clase Sequelize
const basename = path.basename(__filename);
const db = {};

const applyHooks = require('../hooks');

// Carga dinámicamente todos los modelos
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Aplicar los hooks
applyHooks(sequelize);

db.sequelize = sequelize;  // Usa la instancia compartida
db.Sequelize = Sequelize;

module.exports = db;