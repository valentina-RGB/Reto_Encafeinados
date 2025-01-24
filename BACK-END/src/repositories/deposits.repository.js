const { abonoproveedor } = require('../models');

const getAllDeposit = async () => {
    return await abonoproveedor.findAll();
};

const getOneDeposit = async (id) => {
    return await abonoproveedor.findByPk(id);
};

const createDeposit = async (deposit) => {
    return await abonoproveedor.create(deposit);
};

const updateDeposit = async (id, deposit) => {
    return await abonoproveedor.update(deposit, {
        where: { id }
    });
};

const deleteDeposit = async (id) => {
    return await abonoproveedor.destroy({
        where: { id }
    });
};

module.exports = {
    getAllDeposit,
    getOneDeposit,
    createDeposit,
    updateDeposit,
    deleteDeposit
};
