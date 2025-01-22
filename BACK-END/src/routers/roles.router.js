const { Router } = require('express');
const router = Router();

const roleController = require('../controller/roles.controller');

router
    .get('/', roleController.getAllRoles)

module.exports = router;
