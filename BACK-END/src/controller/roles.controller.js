const roleService = require('../services/roles.service');

const getAllRoles = async (req, res) => {
    try {
        const roles = await roleService.getAllRoles();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRoleById = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await roleService.getRoleById(id);
        res.status(200).json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllRoles,
    getRoleById
};