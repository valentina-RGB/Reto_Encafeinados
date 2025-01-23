const depositRepository = require('../repositories/deposits.repository.js');

const getAllDeposit = async () => {
    try {
        return await depositRepository.getAllDeposit();
    } catch (error) {
        throw error;
    }
};

const getOneDeposit = async (id) => {
    try {
        return await depositRepository.getOneDeposit(id);
    } catch (error) {
        throw error;
    }
};

const createDeposit = async (deposit) => {
    try {
        return await depositRepository.createDeposit(deposit);
    } catch (error) {
        throw error;
    }
};

const updateDeposit = async (id, deposit) => {
    try {
        return await depositRepository.updateDeposit(id, deposit);
    } catch (error) {
        throw error;
    }
};

const deleteDeposit = async (id) => {
    try {
        return await depositRepository.deleteDeposit(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllDeposit,
    getOneDeposit,
    createDeposit,
    updateDeposit,
    deleteDeposit
};  

