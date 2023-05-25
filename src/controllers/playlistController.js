const playlistService = require('../services/playlistServices');

const playlistController = {
    getAllPlaylistByUserId: async (req, res) => {
        try {
            const userId = req.params.userId;
            if(!userId) {
                return res.status(400).json({
                    error: true,
                    message:  "Please complete all fields"
                });
            }

            const response = await playlistService.getAllPlaylistByUserId(userId);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    createPlaylist: async (req, res) => {
        try {
            const defaultImg = "https://res.cloudinary.com/thangtrn01/image/upload/v1685005998/spotify/images/album_default_rbtx6a.png";
            const {title, image = defaultImg, userId} = req.body;

            if(!title || !image || !userId) {
                return res.status(400).json({
                    error: true,
                    message:  "Please complete all fields"
                });
            }

            const response = await playlistService.createPlaylist(title, image, userId);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    addSongToPlayList: async (req, res) => {
        try {
            const {playlistId, songId} = req.body;
            if(!playlistId || !songId) {
                return res.status(400).json({
                    error: true,
                    message:  "Please complete all fields"
                });
            }
            const response = await playlistService.addSongToPlayList(playlistId, songId);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    }
}

module.exports = playlistController;