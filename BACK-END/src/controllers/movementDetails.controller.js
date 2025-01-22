const movementDetailsService = require('../services/movementDetails.service');

const getAllMovementDetails = async (req, res) => {
    try {
        const movementDetails = await movementDetailsService.getAllMovementDetails();
        res.json(movementDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOneMovementDetail = async (req, res) => {
    try {
        const movementDetail = await movementDetailsService.getOneMovementDetail(req.params.id);
        res.json(movementDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMovementDetail = async (req, res) => {
    try {
        const movementDetail = await movementDetailsService.createMovementDetail(req.body);
        res.json(movementDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMovementDetail = async (req, res) => {
    try {
        const movementDetail = await movementDetailsService.updateMovementDetail(req.params.id, req.body);
        res.json(movementDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMovementDetail = async (req, res) => {
    try {
        const movementDetail = await movementDetailsService.deleteMovementDetail(req.params.id);
        res.json(movementDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllMovementDetails,
    getOneMovementDetail,
    createMovementDetail,
    updateMovementDetail,
    deleteMovementDetail
};