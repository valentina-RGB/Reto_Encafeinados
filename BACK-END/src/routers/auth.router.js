const { Router } = require('express');
const authController = require('../controllers/auth.controller');
// const { authenticateJWT } = require('../middlewares/auth.middleware');

const router = Router();

router
    .post('/', authController.login);
    
module.exports = router;
