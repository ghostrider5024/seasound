const artistService = require('../services/artistServices');

const artistController = {
    getArtistById: async (req, res) => {
        try {
            const response = await artistService.getArtistById(req.params.artistId);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    }
}

module.exports = artistController;