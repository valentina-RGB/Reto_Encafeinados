const { Router } = require('express');
const settlementController = require('../controllers/settlement.controller.js');


const router = Router();

router
    .get('/', settlementController.getAllSettlement)
    .get('/:id', settlementController.getOneSettlement)
    .post('/', settlementController.createSettlement)
    .put('/:id', settlementController.updateSettlement)
    .delete('/:id', settlementController.deleteSettlement);
    
module.exports = router;



