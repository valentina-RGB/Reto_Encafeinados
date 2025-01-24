const appropiationRepository = require('../repositories/appropiations.repository');

const getAllAppropiations = async () => {
    try {
        return await appropiationRepository.getAllAppropiations();
    } catch (error) {
        throw error;
    }
};

const getOneAppropiation = async (id) => {
    try {
        return await appropiationRepository.getOneAppropiation(id);
    } catch (error) {
        throw error;
    }
};

const createAppropiation = async (appropiation) => {
    try {
        return await appropiationRepository.createAppropiation(appropiation);
    } catch (error) {
        throw error;
    }
};

const updateAppropiation = async (id, appropiation) => {
    try {
        return await appropiationRepository.updateAppropiation(id, appropiation);
    } catch (error) {
        throw error;
    }
};

const deleteAppropiation = async (id) => {
    try {
        return await appropiationRepository.deleteAppropiation(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllAppropiations,
    getOneAppropiation,
    createAppropiation,
    updateAppropiation,
    deleteAppropiation
};