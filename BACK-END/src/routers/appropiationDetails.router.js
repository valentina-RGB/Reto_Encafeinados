const router = require('express').Router();

const appropiationDetailController = require('../controllers/appropiationDetails.controller');

router
    .get('/', appropiationDetailController.getAllAppropiationDetails)
    .get('/:id', appropiationDetailController.getOneAppropiationDetail)

module.exports = router;
