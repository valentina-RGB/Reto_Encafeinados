const productService = require('../services/products.service.js');

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllProductsAvailable = async (req, res) => {
    try {
        const products = await productService.getAllProductsAvailable();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productService.createProduct(product);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await productService.deleteProduct(id);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProducts,
    getAllProductsAvailable,
    createProduct,
    deleteProduct
};