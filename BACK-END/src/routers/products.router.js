const router = require('express').Router();

const productController = require('../controllers/products.controller.js');

router
    .get('/', productController.getAllProductsAvailable)
    .get('/products', productController.getAllProducts)
    // .get('/:id', productController.getProductById)
    .post('/', productController.createProduct)
    .delete('/:id', productController.deleteProduct)
    
module.exports = router;