const initModels = require('./init-models'); // Importa init-models
const { sequelize } = require('../config/db'); // Importa la instancia de Sequelize

// Inicializa los modelos
const models = initModels(sequelize);

module.exports = {
  sequelize, // Exporta la instancia de Sequelize por si la necesitas
  ...models, // Exporta todos los modelos inicializados
};
