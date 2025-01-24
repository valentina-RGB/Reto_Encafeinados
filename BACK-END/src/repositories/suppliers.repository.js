const { proveedores } = require('../models');

const getAllSupliers = async () => {
    return await proveedores.findAll();
};

const getOneSupplier = async (id) => {
    return await proveedores.findByPk(id);
};

const createSupplier = async (supplier) => {
    return await proveedores.create(supplier);
};


module.exports = {
    getAllSupliers,
    getOneSupplier,
    createSupplier
};