const movementService = require('../services/movements.service');

const getAllMovements = async (req, res) => {
    try {
        const movements = await movementService.getAllMovements();
        res.status(200).json(movements);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('aqui en controller:');

    }
};

const getOneMovement = async (req, res) => {
    try {
        const movement = await movementService.getOneMovement(req.params.id);
        res.json(movement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createMovement = async (req, res) => {
    try {
        const movement = await movementService.createMovement(req.body);
        res.json(movement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMovement = async (req, res) => {
    try {
        const movement = await movementService.updateMovement(req.params.id, req.body);
        res.json(movement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMovement = async (req, res) => {
    try {
        const movement = await movementService.deleteMovement(req.params.id);
        res.json(movement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllMovements,
    getOneMovement,
    createMovement,
    updateMovement,
    deleteMovement
};