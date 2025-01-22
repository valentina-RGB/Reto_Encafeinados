const movementDetailsController = require('../controllers/movementDetails.controller');

const router = require('express').Router();

router
    .get('/', movementDetailsController.getAllMovementDetails)
    .get('/:id', movementDetailsController.getOneMovementDetail)
    .post('/', movementDetailsController.createMovementDetail)
    .put('/:id', movementDetailsController.updateMovementDetail)
    .delete('/:id', movementDetailsController.deleteMovementDetail);

module.exports = router;