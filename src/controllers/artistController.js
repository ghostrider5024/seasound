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
    },

    createArtist: async(req, res) => {
        try {
            const {fullname, description, region, image, gender} = req.body;
            if(fullname.trim() == null || region.trim() == null || gender.trim() == null) {
                return res.status(400).json({
                    error: true,
                    message: "Please complete all fields {fullname, region, gender}"
                });
            }
            const response = await artistService.createArtist(fullname, description, region, image, gender);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    editArtist: async (req, res) => {
        try {
            const artistId = req.params.artistId;
            const {fullname, description, region, image, gender} = req.body;
            const response = await artistService.editArtist(artistId, fullname, description, region, image, gender);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    deleteArtist: async (req, res) => {
        try {
            const artistId = req.params.artistId;
            const response = await artistService.deleteArtist(artistId);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    }

    

}


module.exports = artistController;