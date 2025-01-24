const { Router } = require('express');
const depositController = require('../controllers/deposit.controller.js');


const router = Router();

router
    .get('/', depositController.getAllDeposit)
    .get('/supplier', depositController.getAllDepositBySupplier)
    .post('/', depositController.createDeposit)
    .put('/:id', depositController.updateDeposit)
    .delete('/:id', depositController.deleteDeposit);
    
module.exports = router;



