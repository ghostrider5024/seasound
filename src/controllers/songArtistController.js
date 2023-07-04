const songArtistServices = require('../services/songArtistServices');

const songArtistController = {

    getSongArtists: async(req, res) => {
        try {
            const response = await songArtistServices.getSongArtists();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    createSongAritst: async(req, res) => {
        try {
            const {songId, artistId} = req.body;
            if(songId == null || artistId == null) {
                return res.status(400).json({
                    error: true,
                    message: "Please complete all fields"
                });
            }
            const response = await songArtistServices.createSongAritst(songId, artistId);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },


    editSong: async (req, res) => {
        try {
            const songId = req.params.songId;
            const {title, artists, tag, image, song} = req.body;
            const response = await songArtistServices.editSong(songId, title, artists, tag, image, song);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },
   

    deleteSongAritst: async (req, res) => {
        try {
            const songId = +req.params.songId;
            const response = await songArtistServices.deleteSongAritst(songId);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    }
   
}

module.exports = songArtistController;