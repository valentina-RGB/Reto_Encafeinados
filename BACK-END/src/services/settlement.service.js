const settlementRepository = require('../repositories/settlement.repository.js');

const getAllSettlement = async () => {
    try {
        return await settlementRepository.getAllSettlement();
    } catch (error) {
        throw error;
    }
};

const getOneSettlement = async (id) => {
    try {
        return await settlementRepository.getOneSettlement(id);
    } catch (error) {
        throw error;
    }
};

const getProductsOfSettlement = async (id) => {
    try {
        return await settlementRepository.getProductsOfSettlement(id);
    } catch (error) {
        throw error;
    }
};

const createSettlement = async (settlement) => {
    try {
        return await settlementRepository.createSettlement(settlement);
    } catch (error) {
        throw error;
    }
};

const updateSettlement = async (id, settlement) => {
    try {
        return await settlementRepository.updateSettlement(id, settlement);
    } catch (error) {
        throw error;
    }
};

const deleteSettlement = async (id) => {
    try {
        return await settlementRepository.deleteSettlement(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllSettlement,
    getOneSettlement,
    getProductsOfSettlement,
    createSettlement,
    updateSettlement,
    deleteSettlement
};


