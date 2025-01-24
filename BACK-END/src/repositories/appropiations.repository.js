const { consignaciones } = require('../models');

const getAllAppropiations = async () => {
    return await consignaciones.findAll();
};

const getOneAppropiation = async (id) => {
    return await consignaciones.findByPk(id);
};

const createAppropiation = async (appropiation) => {
    return await consignaciones.create(appropiation);
};

const updateAppropiation = async (id, appropiation) => {
    return await consignaciones.update(appropiation, {
        where: { id }
    });
};

const deleteAppropiation = async (id) => {
    return await consignaciones.destroy({
        where: { id }
    });
};

module.exports = {
    getAllAppropiations,
    getOneAppropiation,
    createAppropiation,
    updateAppropiation,
    deleteAppropiation
};