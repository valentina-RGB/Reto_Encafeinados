const { Router } = require('express');
const depositController = require('../controllers/deposit.controller.js');


const router = Router();

router
    .get('/', depositController.getAllDeposit)
    .get('/:id', depositController.getOneDeposit)
    .post('/', depositController.createDeposit)
    .put('/:id', depositController.updateDeposit)
    .delete('/:id', depositController.deleteDeposit);
    
module.exports = router;



