const { detalleconsignacion } = require('../models');

const getAllAppropiationDetails = async () => {
    return await detalleconsignacion.findAll();
};

const getOneAppropiationDetail = async (id) => {
    return await detalleconsignacion.findByPk(id);
};

module.exports = {
    getAllAppropiationDetails,
    getOneAppropiationDetail
};