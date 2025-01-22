const { tiendas } = require('../models');

const getAllStores = async () => {
    return await tiendas.findAll();
};

const getOneStore = async (id) => {
    return await tiendas.findByPk(id);
};

module.exports = {
    getAllStores,
    getOneStore
};