const express = require('express');
const playlistController = require('../controllers/playlistController');

const router = express.Router();

router.post('/playlist', playlistController.createPlaylist);
router.get('/playlist/:userId', playlistController.getAllPlaylistByUserId);
router.post('/playlist/add-song', playlistController.addSongToPlayList);

module.exports = router;
