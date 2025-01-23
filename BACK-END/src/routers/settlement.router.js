const { Router } = require('express');
const settlementController = require('../controllers/settlement.controller.js');


const router = Router();

router
    .get('/', settlementController.getAllSettlement);

    
module.exports = router;



