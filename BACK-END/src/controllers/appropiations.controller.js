const appropiationService = require('../services/appropiations.service');

const getAllAppropiations = async (req, res) => {
    try {
        const appropiations = await appropiationService.getAllAppropiations();
        res.status(200).json(appropiations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOneAppropiation = async (req, res) => {
    try {
        const { id } = req.params;
        const appropiation = await appropiationService.getOneAppropiation(id);
        res.status(200).json(appropiation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createAppropiation = async (req, res) => {
    try {
        const appropiation = req.body;
        const newAppropiation = await appropiationService.createAppropiation(appropiation);
        res.status(201).json(newAppropiation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAppropiation = async (req, res) => {
    try {
        const { id } = req.params;
        const appropiation = req.body;
        await appropiationService.updateAppropiation(id, appropiation);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteAppropiation = async (req, res) => {
    try {
        const { id } = req.params;
        await appropiationService.deleteAppropiation(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllAppropiations,
    getOneAppropiation,
    createAppropiation,
    updateAppropiation,
    deleteAppropiation
};