const albumServices = require('../services/albumServices');

const albumController = {
    getAllAlbum: async(req, res) => {
        try {
            const response = await albumServices.getAllAlbum();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },
    
    getAlbumById: async(req, res) => {
        try {
            const albumId = req.params.id;
            const response = await albumServices.getAlbumById(albumId);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },
    
    createAlbum: async(req, res) => {
        try {
            const {title, description, image, artists, songsId = []} = req.body;

            if(title.trim() == null || description.trim() == null || image.trim() == null || artists.trim() == null) {
                return res.status(400).json({
                    error: true,
                    message: "Please complete all fields"
                })
            }

            console.log(title, description, image, artists, songsId)
            
            if(songsId.length <= 0) {
                return res.status(400).json({
                    error: true,
                    message: "Please complete all fields"
                })
            }

            const response = await albumServices.createAlbum(title, artists, description, image,  songsId);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    addSongToAlbum: async (req, res) => {
        try {
            const {albumId, songId} = req.body;
            if(albumId == null || songId == null) {
                return res.status(400).json({
                    error: true,
                    message: "Please complete all fields"
                })
            }

            const response = await albumServices.addSongToAlbum(albumId, songId);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },
    
    deleteAlbum: async(req, res) => {},
    
}

module.exports = albumController;