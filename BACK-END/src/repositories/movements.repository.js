const { movimientos } = require('../models');

const getAllMovements = async () => {
    return await movimientos.findAll();
};

const getOneMovement = async (id) => {
    return await movimientos.findByPk(id);
};

const createMovement = async (movement) => {
    return await movimientos.create(movement);
};

const updateMovement = async (id, movement) => {
    return await movimientos.update(movement, { where: { id } });
};

const deleteMovement = async (id) => {
    return await movimientos.destroy({ where: { id } });
};

module.exports = {
    getAllMovements,
    getOneMovement,
    createMovement,
    updateMovement,
    deleteMovement
};