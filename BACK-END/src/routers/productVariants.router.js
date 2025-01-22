const variantController = require('../controllers/productVariants.controller');

const router = require('express').Router();

router
    .get('/', variantController.getAllVariants)
    .get('/:id', variantController.getOneVariant)
    .post('/', variantController.createVariant)
    .put('/:id', variantController.updateVariant)
    .delete('/:id', variantController.deleteVariant);

module.exports = router;