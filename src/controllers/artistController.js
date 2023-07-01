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
            const fullname = req.query.fullname;
            const gender = req.query.gender;
            const region = req.query.region;

            const response = await artistService.searchArtist(fullname, gender, region);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    artistRegions: async (req, res) => {
        try {
            const response = await artistService.artistRegions();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    }

    

}


module.exports = artistController;