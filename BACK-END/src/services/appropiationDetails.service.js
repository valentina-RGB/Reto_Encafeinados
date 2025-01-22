const appropiationDetailRepository = require('../repositories/appropiationDetails.repository');

const getAllAppropiationDetails = async () => {
    try {
        return await appropiationDetailRepository.getAllAppropiationDetails();
    } catch (error) {
        throw error;
    }
};

const getOneAppropiationDetail = async (id) => {
    try {
        return await appropiationDetailRepository.getOneAppropiationDetail(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllAppropiationDetails,
    getOneAppropiationDetail
};