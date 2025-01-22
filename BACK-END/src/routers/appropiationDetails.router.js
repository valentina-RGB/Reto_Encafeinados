const { Router } = require('express');
const router = Router();

const appropiationDetailController = require('../controller/appropiationDetails.controller');

router
    .get('/', appropiationDetailController.getAllAppropiationDetails)
    .get('/:id', appropiationDetailController.getOneAppropiationDetail)

module.exports = router;
