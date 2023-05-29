const express = require('express');
const authController = require('../controllers/authController');
const multer = require('../middleware/multer');

const router = express.Router();

router.get('/auth/get-users', authController.getAllUser);
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.put('/auth/edit/:userId', multer.single('file'), authController.edit);

module.exports = router;