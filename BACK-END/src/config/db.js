const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false,
        define: {
            timestamps: true,
            underscored: false,  // Usa nombres de columna tal cual los defines  
            createdAt: 'created_at',
            updatedAt: 'updated_at'
          }
    }
);

const createDatabaseIfNotExists = async () => {
    try {
        // Crea una conexión temporal a MySQL
        const tempSequelize = new Sequelize(
            `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`,
            { dialect: 'mysql', logging: false }
        );

        await tempSequelize.authenticate();

        // Se crea la base de datos si no existe
        await tempSequelize.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);

        // Cierra la conexión temporal
        await tempSequelize.close();

    } catch (error) {
        console.error('Error al conectar o crear la base de datos:', error.message);
        console.error('Detalles:', error);
    }
};

// Función para establecer la conexión a la base de datos

const connectToDatabase = async () => {
    try {
        await createDatabaseIfNotExists();
        await sequelize.authenticate();
        console.log(`\nConexión establecida a la base de datos "${process.env.DB_NAME}"`);
    } catch (error) {
        console.error('Error de conexión completo:', error);
        console.error('Mensaje de error:', error.message);
        console.error('Código de error:', error.code);
        throw error;
    }
    return sequelize;
};

module.exports = { sequelize, connectToDatabase };