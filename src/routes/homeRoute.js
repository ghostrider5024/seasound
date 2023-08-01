const express = require('express');
const homeController = require('../controllers/homeController');

const router = express.Router();

router.get('/home', homeController.getHome);
router.put('/home/edit-album-title', homeController.editHomeAlbumTitle);
router.put('/home/edit-album/:albumId', homeController.editHomeAlbum);


module.exports = router;