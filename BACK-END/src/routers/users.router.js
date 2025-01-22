const router = require('express').Router();

const userController = require('../controllers/users.controller.js');

router
    .get('/', userController.getAllUsers)

module.exports = router;