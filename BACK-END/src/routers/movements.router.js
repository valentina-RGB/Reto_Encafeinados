const movementController = require('../controllers/movements.controller');

const router = require('express').Router();

router
    .get('/', movementController.getAllMovements)
    .get('/:id', movementController.getOneMovement)
    .post('/', movementController.createMovement)
    .put('/:id', movementController.updateMovement)
    .delete('/:id', movementController.deleteMovement);

module.exports = router;