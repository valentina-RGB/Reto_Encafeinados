const roleRepository = require('../repositories/roles.repository');

const getAllRoles = async () => {
    try {
        return await roleRepository.getAllRoles();
    } catch (error) {
        throw error;
    }
};

const getRoleById = async (id) => {
    try {
        return await roleRepository.getRoleById(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllRoles,
    getRoleById
};