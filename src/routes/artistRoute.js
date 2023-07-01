const express = require('express');

const artistController = require('../controllers/artistController');


const router = express.Router();

router.get('/artist/:artistId', artistController.getArtistById);
router.get('/artists', artistController.getAllArtist);
router.get('/artists-search', artistController.searchArtist);
router.get('/artist-regions', artistController.artistRegions);

router.post('/artist', artistController.createArtist);
router.put('/artist/edit/:artistId', artistController.editArtist)
router.delete('/artist/delete/:artistId', artistController.deleteArtist)

module.exports = router;