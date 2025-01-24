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

const createRole = async (role) => {
    try {
        return await roleRepository.createRole(role);
    } catch (error) {
        throw error;
    }
};

const updateRole = async (id, role) => {
    try {
        return await roleRepository.updateRole(id, role);
    } catch (error) {
        throw error;
    }
};

const deleteRole = async (id) => {
    try {
        return await roleRepository.deleteRole(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllRoles,
    getOneRole,
    createRole,
    updateRole,
    deleteRole
};