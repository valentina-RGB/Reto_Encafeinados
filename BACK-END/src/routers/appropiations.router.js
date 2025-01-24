const router = require('express').Router();

const appropiationController = require('../controllers/appropiations.controller');

router
    .get('/', appropiationController.getAllAppropiations)
    .get('/:id', appropiationController.getOneAppropiation)
    .post('/', appropiationController.createAppropiation)
    .put('/:id', appropiationController.updateAppropiation)
    .delete('/:id', appropiationController.deleteAppropiation);

module.exports = router;
