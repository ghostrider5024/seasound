const express = require('express');
const songArtistController = require('../controllers/songArtistController');

const router = express.Router();

router.get('/song-artists', songArtistController.getSongArtists)
router.post('/song-artist', songArtistController.createSongAritst);
// router.put('/songs/edit/:songId', songArtistController.editSongAritst)
router.delete('/song-artist/delete/:songId', songArtistController.deleteSongAritst);



module.exports = router;