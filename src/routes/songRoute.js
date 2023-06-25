const express = require('express');
const songController = require('../controllers/songController');

const router = express.Router();

router.get('/songs', songController.getAllSong);
router.get('/songs/:id', songController.getSongById);
router.post('/songs', songController.createSong);
router.put('songs/edit/:songID', songController.editSong)
router.delete('/songs/:id', songController.deleteSong);
router.get('/songs-search', songController.searchSong);
router.get('/songs-favorite/:userId', songController.getFavoriteList);
router.post('/songs-favorite', songController.favoriteSong);

module.exports = router;