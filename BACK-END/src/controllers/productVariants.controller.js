const variantService = require('../services/productVariants.service');

const getAllVariants = async (req, res) => {
    try {
        const variants = await variantService.getAllVariants();
        res.status(200).json(variants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOneVariant = async (req, res) => {
    try {
        const { id } = req.params;
        const variant = await variantService.getVariantById(id);
        res.status(200).json(variant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createVariant = async (req, res) => {
    try {
        const variant = req.body;
        const newVariant = await variantService.createVariant(variant);
        res.status(201).json(newVariant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateVariant = async (req, res) => {
    try {
        const { id } = req.params;
        const variant = req.body;
        const updatedVariant = await variantService.updateVariant(id, variant);
        res.status(200).json(updatedVariant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteVariant = async (req, res) => {
    try {
        const { id } = req.params;
        await variantService.deleteVariant(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllVariants,
    getOneVariant,
    createVariant,
    updateVariant,
    deleteVariant
};