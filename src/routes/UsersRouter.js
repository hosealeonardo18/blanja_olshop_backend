const express = require('express');
const router = express.Router();
const usersController = require('../controller/UsersController');
const {
  protect
} = require('../middleware/AuthMiddleware')

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.post('/refresh-token', usersController.refreshToken);
router.get('/profile', protect, usersController.profile);


module.exports = router;