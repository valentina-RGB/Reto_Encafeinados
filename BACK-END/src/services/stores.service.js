const storeRepository = require('../repositories/stores.repository');  

const getAllStores = async () => {
    try {
        return await storeRepository.getAllStores();
    } catch (error) {
        throw error;
    }
};

const getOneStore = async (id) => {
    try {
        return await storeRepository.getOneStore(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllStores,
    getOneStore
};