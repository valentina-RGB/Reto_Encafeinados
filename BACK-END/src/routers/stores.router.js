const router = require('express').Router();

const storeController = require('../controllers/stores.controller');

router
    .get('/', storeController.getAllStores)
    .get('/:id', storeController.getOneStore)
    .post('/', storeController.createStore)
    .put('/:id', storeController.updateStore)
    .delete('/:id', storeController.deleteStore);

module.exports = router;