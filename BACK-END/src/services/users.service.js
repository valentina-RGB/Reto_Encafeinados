const userRepository = require('../repositories/users.repository');

const getAllUsers = async () => {
    try {
        return await userRepository.getAllUsers();
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllUsers
};