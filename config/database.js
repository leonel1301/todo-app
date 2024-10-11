require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);

// Función para conectar a la base de datos
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida con éxito.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
};

// Exportar la instancia de sequelize y la función de conexión
module.exports = { sequelize, connectDB };