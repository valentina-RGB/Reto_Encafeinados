'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
require('dotenv').config();

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL_MODE === 'DISABLED' ? false : true,
  },
};

const db = {};
let sequelize;

if (config[env]) {
  sequelize = new Sequelize(
    config[env].database, 
    config[env].username, 
    config[env].password, 
    config[env]
  );
} else {
  console.error(`No se encuentra la configuración para el entorno: ${env}`);
  process.exit(1);
}

// Primero cargar todos los modelos
fs.readdirSync(__dirname)
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

// Luego establecer las asociaciones
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});



db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// Finalmente, aplicar los hooks después de que los modelos estén completamente definidos
