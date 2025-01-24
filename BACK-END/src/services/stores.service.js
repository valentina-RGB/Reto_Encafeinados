const storeRepository = require('../repositories/stores.repository');
const userService = require('./users.service');

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

const createStore = async (store) => {
    try {
        const email = store.correoTienda;
        const password = await userService.createPassword(store.nombreTienda);

        const user = await userService.createUser({ idRol: 1, correoUsuario: email, claveUsuario: password });

        storeFinal = {
            ...store,
            idUsuario: user.idUsuario,
        };

        const response = await storeRepository.createStore(storeFinal);

        if (!response) return ('No se pudo registrar la tienda.');

        await userService.sendEmail(email, password);
                
        return (user,response);

    } catch (error) {
        throw error;
    }
};

const updateStore = async (id, store) => {
    try {
        return await storeRepository.updateStore(id, store);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllStores,
    getOneStore,
    createStore,
    updateStore
};