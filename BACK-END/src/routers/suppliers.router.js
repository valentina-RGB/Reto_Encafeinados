const supplierController = require('../controllers/suppliers.controller');   

const router = require('express').Router();

router
    .get('/', supplierController.getAllSuppliers)
    .get('/:id', supplierController.getOneSupplier)
    .post('/', supplierController.createSupplier)
    .put('/:id', supplierController.updateSupplier)
    .delete('/:id', supplierController.deleteSupplier);

module.exports = router;