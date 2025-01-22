const { Router } = require('express');
const router = Router();

const productController = require('../controller/products.controller.js');

router
    .get('/', productController.getAllProducts)

module.exports = router;