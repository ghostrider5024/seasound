const express = require('express');
const multer = require('../middleware/multer');
const uploadController = require('../controllers/uploadController');
const router = express.Router();

router.post('/mp3/upload', multer.single('file'), uploadController.uploadSong);
router.post('/image/upload', multer.single('file'), uploadController.uploadImage);

module.exports = router;