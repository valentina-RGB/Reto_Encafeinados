const supplierRepository = require('../repositories/suppliers.repository');

const gerAllSuppliers = async () => {
    try {
        return await supplierRepository.getAllSupliers();
    } catch (error) {
        throw error;
    }
};

const getOneSupplier = async (id) => {
    try {
        return await supplierRepository.getOneSupplier(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    gerAllSuppliers,
    getOneSupplier
};