const { Router } = require('express');
const router = Router();

const userController = require('../controller/users.controller.js');

router
    .get('/', userController.getAllUsers)

module.exports = router;