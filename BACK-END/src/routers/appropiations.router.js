const { Router } = require('express');
const router = Router();

const appropiationController = require('../controller/appropiations.controller');

router
    .get('/', appropiationController.getAllAppropiations)
    .get('/:id', appropiationController.getOneAppropiation)

module.exports = router;
