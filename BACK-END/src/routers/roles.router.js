const router = require('express').Router();

const roleController = require('../controllers/roles.controller');

router
    .get('/', roleController.getAllRoles)
    .get('/:id', roleController.getOneRole)

module.exports = router;
