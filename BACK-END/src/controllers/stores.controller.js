const storeService = require('../services/stores.service');

const getAllStores = async (req, res) => {
    try {
        const stores = await storeService.getAllStores();
        res.status(200).json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOneStore = async (req, res) => {
    try {
        const store = await storeService.getOneStore(req.params.id);
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createStore = async (req, res) => {
    try {
        const store = await storeService.createStore(req.body);
        res.status(201).json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateStore = async (req, res) => {
    try {
        const store = await storeService.updateStore(req.params.id, req.body);
        res.status(200).json(store);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteStore = async (req, res) => {
    try {
        await storeService.deleteStore(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllStores,
    getOneStore,
    createStore,
    updateStore,
    deleteStore
};