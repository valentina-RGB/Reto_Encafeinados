const appropiationService = require('../services/appropiationDetails.service');

const getAllAppropiationDetails = async (req, res) => {
    try {
        const appropiationDetails = await appropiationService.getAllAppropiationDetails();
        res.status(200).json(appropiationDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOneAppropiationDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const appropiationDetail = await appropiationService.getOneAppropiationDetail(id);
        res.status(200).json(appropiationDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllAppropiationDetails,
    getOneAppropiationDetail
};