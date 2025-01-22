const { productos } = require('../models');

const getAllProducts = async () => {
    return await productos.findAll();
};

module.exports = {
    getAllProducts
};