const roleRepository = require('../repositories/roles.repository');

const getAllRoles = async () => {
    try {
        return await roleRepository.getAllRoles();
    } catch (error) {
        throw error;
    }
};

const getOneRole = async (id) => {
    try {
        return await roleRepository.getOneRole(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllRoles,
    getOneRole
};