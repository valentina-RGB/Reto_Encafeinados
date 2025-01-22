const movementRepository = require('../repositories/movements.repository');

const getAllMovements = async () => {
    try {
        return await movementRepository.getAllMovements();
    } catch (error) {
        throw error;
    }
};

const getOneMovement = async (id) => {
    try {
        return await movementRepository.getOneMovement(id);
    } catch (error) {
        throw error;
    }
};

const createMovement = async (movement) => {
    try {
        return await movementRepository.createMovement(movement);
    } catch (error) {
        throw error;
    }
};

const updateMovement = async (id, movement) => {
    try {
        return await movementRepository.updateMovement(id, movement);
    } catch (error) {
        throw error;
    }
};

const deleteMovement = async (id) => {
    try {
        return await movementRepository.deleteMovement(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllMovements,
    getOneMovement,
    createMovement,
    updateMovement,
    deleteMovement
};