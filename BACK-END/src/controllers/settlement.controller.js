const settlementService = require('../services/settlement.service.js');

const getAllSettlement = async (req, res) => {
    const settlement = await settlementService.getAllSettlement();
    res.status(200).json(settlement);
};

const getOneSettlement = async (req, res) => {
    try {
        const settlement = await settlementService.getOneSettlement(req.params.id);
        res.status(200).json(settlement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createSettlement = async (req, res) => {
    try {
        const settlement = await settlementService.createSettlement(req.body);
        res.json(settlement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSettlement = async (req, res) => {
    try {
        const settlement = await settlementService.updateSettlement(req.params.id, req.body);
        res.json(settlement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSettlement = async (req, res) => {
    try {
        const settlement = await settlementService.deleteSettlement(req.params.id);
        res.json(settlement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllSettlement,
    getOneSettlement,
    createSettlement,
    updateSettlement,
    deleteSettlement
};