const productRepository = require('../repositories/products.repository');

const getAllProducts = async () => {
    try {
        return await productRepository.getAllProducts();
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllProducts
};