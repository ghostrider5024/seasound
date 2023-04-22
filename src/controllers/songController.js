const songServices = require('../services/songService');

const songController = {
    getAllSong: async(req, res) => {
        try {
            const response = await songServices.getAllSong();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    getSongById: async(req, res) => {
        try {
            const songId = +req.params.id;
            const response = await songServices.getSongById(songId);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    createSong: async(req, res) => {
        try {
            const {title, artists, image, song} = req.body;
            if(title.trim() == null || artists.trim() == null || image.trim() == null || song.trim() == null) {
                return res.status(400).json({
                    error: true,
                    message: "Please complete all fields"
                });
            }
            const response = await songServices.createSong(title, artists, image, song);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    deleteSong: async (req, res) => {
        try {
            const songId = +req.params.id;
            const response = await songServices.deleteSong(songId);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    searchSong: async (req, res) => {
        try {
            const songName = req.query.name;

            console.log(req.query);

            if(!songName?.trim()) {
                return res.status(400).json({
                    error: true,
                    message: "Please complete song name fields"
                });
            }

            const response = await songServices.searchSong(songName);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    favoriteSong: async (req, res) => {
        try {
            const {userId, songId} = req.body;

            if(!userId || !songId) {
                return res.status(400).json({
                    error: true,
                    message: "Please complete all fields"
                });
            }

            const response = await songServices.favoriteSong(userId, songId);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    }
}

module.exports = songController;