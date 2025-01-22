const { consignaciones } = require('../models');

const getAllAppropiations = async () => {
    return await consignaciones.findAll();
};

const getOneAppropiation = async (id) => {
    return await consignaciones.findByPk(id);
};

module.exports = {
    getAllAppropiations,
    getOneAppropiation
};