const { abonoproveedor } = require('../models');

const getAllDeposit = async () => {
    return await abonoproveedor.findAll();
};

const getOneDeposit = async (id) => {
    return await abonoproveedor.findByPk(id);

};

module.exports = {
    getAllDeposit,
    getOneDeposit
};
