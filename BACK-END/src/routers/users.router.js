const router = require('express').Router();

const userController = require('../controllers/users.controller.js');

router
    .get('/', userController.getAllUsers)
    .get('/:id', userController.getOneUser)
    .post('/', userController.createUser)
    .put('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser);

module.exports = router;