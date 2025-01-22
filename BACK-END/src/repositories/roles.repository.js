const { roles } = require('../models');

const getAllRoles = async () => {
    return await roles.findAll();
};

const getRoleById = async (id) => {
    return await roles.findByPk(id);
};

module.exports = {
    getAllRoles,
    getRoleById
};