const express = require('express');
const albumController = require('../controllers/albumController');


const router = express.Router();

router.get('/album', albumController.getAllAlbum);
router.get('/album/:id', albumController.getAlbumById);
router.post('/album', albumController.createAlbum);
router.post('/album/add-song', albumController.addSongToAlbum);
router.delete('/album/:id', albumController.deleteAlbum);

module.exports = router;