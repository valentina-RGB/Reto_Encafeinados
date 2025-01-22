const { roles } = require('../models');

const getAllRoles = async () => {
    return await roles.findAll();
};

module.exports = {
    getAllRoles
};