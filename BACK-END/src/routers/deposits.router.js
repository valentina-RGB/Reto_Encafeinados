const { Router } = require('express');
const depositController = require('../controllers/deposit.controller.js');


const router = Router();

router
    .get('/', depositController.getAllDeposit);

    
module.exports = router;

