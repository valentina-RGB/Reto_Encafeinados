const { detallemovimiento } = require('../models');

const getAllMovementDetails = async () => {
    return await detallemovimiento.findAll();
};

const getOneMovementDetail = async (id) => {
    return await detallemovimiento.findByPk(id);
};

const createMovementDetail = async (movementDetail) => {
    return await detallemovimiento.create(movementDetail);
};

const updateMovementDetail = async (id, movementDetail) => {
    return await detallemovimiento.update(movementDetail, {
        where: { idDetalleMovimiento: id }
    });
};  

const deleteMovementDetail = async (id) => {
    return await detallemovimiento.destroy({
        where: { idDetalleMovimiento: id }
    });
};

module.exports = {
    getAllMovementDetails,
    getOneMovementDetail,
    createMovementDetail,
    updateMovementDetail,
    deleteMovementDetail
};