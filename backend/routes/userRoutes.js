const router = require('express').Router();
const controller = require('../controller/userController');

router.post('/register', controller.registerUser);

router.post('/login', controller.loginUser);

module.exports = router;
