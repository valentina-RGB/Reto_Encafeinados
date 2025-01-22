const userRepository = require('../repositories/users.repository');

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const getAllUsers = async () => {
    try {
        return await userRepository.getAllUsers();
    } catch (error) {
        throw error;
    }
};

const getOneUser = async (id) => {
    try {
        return await userRepository.getOneUser(id);
    } catch (error) {
        throw error;
    }
};

const createUser = async (user) => {
    try {
        const hashedPassword = await bcrypt.hash(user.claveUsuario, SALT_ROUNDS);
        user.claveUsuario = hashedPassword;

        return await userRepository.createUser(user); 
    } catch (error) {
        throw error;
    }
};

const updateUser = async (id, user) => {
    try {
        if (user.claveUsuario) {
            user.claveUsuario = await bcrypt.hash(user.claveUsuario, SALT_ROUNDS);
        }
        return await userRepository.updateUser(id, user);

    } catch (error) {
        throw error;
    }
};

const deleteUser = async (id) => {
    try {
        return await userRepository.deleteUser(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
};