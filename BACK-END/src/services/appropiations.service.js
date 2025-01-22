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

module.exports = {
    getAllAppropiations,
    getOneAppropiation
};