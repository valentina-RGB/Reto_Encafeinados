const sensoryProfileController = require('../controllers/sensoryProfiles.controller');

const router = require('express').Router();

router
    .get('/', sensoryProfileController.getAllSensoryProfiles)
    .get('/:id', sensoryProfileController.getOneSensoryProfile)
    .post('/', sensoryProfileController.createSensoryProfile)
    .put('/:id', sensoryProfileController.updateSensoryProfile)
    .delete('/:id', sensoryProfileController.deleteSensoryProfile);

module.exports = router;