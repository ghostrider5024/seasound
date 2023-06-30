const artistService = require('../services/artistServices');

const artistController = {
    getArtistById: async (req, res) => {
        try {
            const response = await artistService.getArtistById(req.params.artistId);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    getAllArtist: async(req, res) => {
        try {
            const response = await artistService.getAllArtist();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    searchArtist: async (req, res) => {
        try {
            const query = req.query.querykey;

            const response = await artistService.searchArtist(query);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    artistRegions: async (req, res) => {
        try {
            const query = req.query.querykey;

            const response = await artistService.artistRegions(query);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    }

    

}


module.exports = artistController;