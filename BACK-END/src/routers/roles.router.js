const router = require('express').Router();

const roleController = require('../controllers/roles.controller');

router
    .get('/', roleController.getAllRoles)
    .get('/:id', roleController.getOneRole)
    .post('/', roleController.createRole)
    .put('/:id', roleController.updateRole)
    .delete('/:id', roleController.deleteRole);

module.exports = router;
