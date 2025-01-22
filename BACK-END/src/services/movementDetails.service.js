const movementDetailsRepository = require('../repositories/movementDetails.repository');

const getAllMovementDetails = async () => {
    try {
        return await movementDetailsRepository.getAllMovementDetails();
    } catch (error) {
        throw new Error(error.message);
    }
};

const getOneMovementDetail = async (id) => {
    try {
        return await movementDetailsRepository.getOneMovementDetail(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

const createMovementDetail = async (movementDetail) => {
    try {
        return await movementDetailsRepository.createMovementDetail(movementDetail);
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateMovementDetail = async (id, movementDetail) => {
    try {
        return await movementDetailsRepository.updateMovementDetail(id, movementDetail);
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteMovementDetail = async (id) => {
    try {
        return await movementDetailsRepository.deleteMovementDetail(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getAllMovementDetails,
    getOneMovementDetail,
    createMovementDetail,
    updateMovementDetail,
    deleteMovementDetail
};