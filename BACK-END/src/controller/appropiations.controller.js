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

module.exports = {
    getAllAppropiations,
    getOneAppropiation
};