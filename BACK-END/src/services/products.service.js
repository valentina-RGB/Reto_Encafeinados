const productRepository = require('../repositories/products.repository');

const getAllProducts = async () => {
    try {
        return await productRepository.getAllProducts();
    } catch (error) {
        throw error;
    }
};

const getAllProductsAvailable = async () => {
    try {
        return await productRepository.getAllProductsAvailable();
    } catch (error) {
        throw error;
    }
};

const createProduct = async (product) => {
    try {
        return await productRepository.createProduct(product);
    } catch (error) {
        throw error;
    }
};

const deleteProduct = async (id) => {
    try {
        return await productRepository.deleteProduct(id);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllProducts,
    getAllProductsAvailable,
    createProduct,
    deleteProduct
};