const router = require('express').Router();

const appropiationController = require('../controllers/appropiations.controller');

router
    .get('/', appropiationController.getAllAppropiations)
    .get('/:id', appropiationController.getOneAppropiation)

module.exports = router;
