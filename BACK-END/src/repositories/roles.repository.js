const { roles } = require('../models');

const getAllRoles = async () => {
    return await roles.findAll();
};

const getOneRole = async (id) => {
    return await roles.findByPk(id);
};

const createRole = async (role) => {
    return await roles.create(role);
};

const updateRole = async (id, role) => {
    return await roles.update(role, { where: { id } });
};

const deleteRole = async (id) => {
    return await roles.destroy({ where: { id } });
};

module.exports = {
    getAllRoles,
    getOneRole,
    createRole,
    updateRole,
    deleteRole
};