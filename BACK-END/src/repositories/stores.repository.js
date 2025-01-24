const { tiendas } = require('../models');

const getAllStores = async () => {
    return await tiendas.findAll();
};

const getOneStore = async (id) => {
    return await tiendas.findByPk(id);
};

const createStore = async (store) => {
    return await tiendas.create(store);
};

const updateStore = async (id, store) => {
    return await tiendas.update(store, { where: { idTienda: id } });
};
module.exports = {
    getAllStores,
    getOneStore,
    createStore,
    updateStore
};