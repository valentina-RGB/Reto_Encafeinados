const router = require('express').Router();

const productController = require('../controllers/products.controller.js');

router
    .get('/', productController.getAllProducts)

module.exports = router;