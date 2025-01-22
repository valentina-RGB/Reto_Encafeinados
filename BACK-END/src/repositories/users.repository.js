const { usuarios } = require('../models');

const getAllUsers = async () => {
    return await usuarios.findAll();
};

module.exports = {
    getAllUsers
};