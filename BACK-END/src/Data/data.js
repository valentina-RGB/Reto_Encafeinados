const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

// Datos de conexión
const DB_NAME = 'api_cafeinados';
const DB_USER = 'root';
const DB_PASSWORD = '';
const DB_HOST = 'localhost';

// Función para asegurarte de que la base de datos existe
async function ensureDatabaseExists() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
  });

  // Crear la base de datos si no existe
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
  await connection.end();
}

// Configura Sequelize
async function initializeSequelize() {
  await ensureDatabaseExists();

  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false,
  });

  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }

  return sequelize;
}

module.exports = {
  initializeSequelize,
};
