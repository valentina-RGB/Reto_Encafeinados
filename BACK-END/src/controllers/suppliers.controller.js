const supplerService = require('../services/suppliers.service');    

const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await supplerService.gerAllSuppliers();
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOneSupplier = async (req, res) => {
    try {
        const supplier = await supplerService.getOneSupplier(req.params.id);
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createSupplier = async (req, res) => {
    try {
        const supplier = await supplerService.createSupplier(req.body);
        res.status(201).json(supplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSupplier = async (req, res) => {
    try {
        const supplier = await supplerService.updateSupplier(req.params.id, req.body);
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSupplier = async (req, res) => {
    try {
        await supplerService.deleteSupplier(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllSuppliers,
    getOneSupplier,
    createSupplier,
    updateSupplier,
    deleteSupplier
};