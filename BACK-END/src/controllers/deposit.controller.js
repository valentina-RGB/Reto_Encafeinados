const depositService = require('../services/deposits.service.js');

const getAllDeposit = async (req, res) => {
    const deposits = await depositService.getAllDeposit();
    res.status(200).json(deposits);
}

const getOneDeposit = async (req, res) => {
    try {
        const deposits = await depositService.getOneDeposit(req.params.id);
        res.status(200).json(deposits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const createDeposit = async (req, res) => {
    try {
        const deposits = await depositService.createDeposit(req.body);
        res.json(deposits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateDeposit = async (req, res) => {
    try {
        const deposits = await depositService.updateDeposit(req.params.id, req.body);
        res.json(deposits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteDeposit = async (req, res) => {
    try {
        const deposits = await depositService.deleteDeposit(req.params.id);
        res.json(deposits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getAllDeposit,
    getOneDeposit,
    createDeposit,
    updateDeposit,
    deleteDeposit
};






