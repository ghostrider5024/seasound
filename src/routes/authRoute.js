const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/auth/get-users', authController.getAllUser);
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);

module.exports = router;