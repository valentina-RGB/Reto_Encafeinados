const { usuarios } = require('../models');

const getAllUsers = async () => {
    return await usuarios.findAll();
};

const getOneUser = async (id) => {
    return await usuarios.findByPk(id);
};

const createUser = async (user) => {
    return await usuarios.create(user);
};

const updateUser = async (id, user) => {
    return await usuarios.update(user, { where: { idUsuario : id } });
};

const deleteUser = async (id) => {
    return await usuarios.destroy({ where: { idUsuario : id } });
};

module.exports = {
    getAllUsers
};