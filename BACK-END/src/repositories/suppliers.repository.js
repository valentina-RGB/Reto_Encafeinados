const { proveedores } = require('../models');

const getAllSupliers = async () => {
    return await proveedores.findAll();
};

const getOneSupplier = async (id) => {
    return await proveedores.findByPk(id);
};

module.exports = {
    getAllSupliers,
    getOneSupplier
};