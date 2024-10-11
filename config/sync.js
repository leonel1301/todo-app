const { sequelize } = require('./database');  // Importar la instancia de Sequelize
const User = require('../models/User');  // Importar el modelo User (ajusta la ruta según tu estructura)
const Task = require('../models/Task');  // Importar el modelo Task (ajusta la ruta según tu estructura)

const syncDB = async () => {
    try {
        await sequelize.sync({ force: false });  // Set force: true para eliminar y recrear las tablas
        console.log('Tablas sincronizadas con la base de datos');
    } catch (error) {
        console.error('Error al sincronizar con la base de datos:', error);
    }
};

module.exports = syncDB