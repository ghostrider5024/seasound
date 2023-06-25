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
            const {title, artists, tag, image, song} = req.body;
            if(title.trim() == null || artists.trim() == null || image.trim() == null || song.trim() == null) {
                return res.status(400).json({
                    error: true,
                    message: "Please complete all fields"
                });
            }
            const response = await songServices.createSong(title, artists, tag, image, song);

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    // createSong: async(req, res) => {
    //     try {
    //         const {title, artists, tag} = req.body;
    //         let audioFile, imageFile;

    //         if(title.trim() == null || artists.trim() == null) {
    //             return res.status(400).json({
    //                 error: true,
    //                 message: "Please complete all fields"
    //             });
    //         }

    //         const response = await songServices.createSong(title, artists, tag);
    //         let audioID = response.data.SONG_ID;
    //         if(response?.data)
    //         {
    //             if (req.file) {
    //                 if (req.file.fieldname === 'image') {
    //                     imageFile = await cloudinary.uploader.upload(req.file.path, {
    //                     folder: 'SeaSound/Song/Image',
    //                     public_id: 'Image_' + audioID
    //                   });
    //                 } else if (req.file.fieldname === 'audio') {
    //                     audioFile = await cloudinary.uploader.upload(req.file.path, {
    //                     folder: 'SeaSound/Song/Audio',
    //                     public_id: 'Audio_' + audioID
    //                   });
    //                 }
    //             }
    //         }

    //         songServices.editSong(audioID, title, artists, tag, imageFile?.secure_url, audioFile?.secure_url)

    //         res.status(200).json(response);
    //     } catch (error) {
    //         res.status(500).json({error: true, message: error.message});
    //     }
    // },

    editSong: async (req, res) => {
        try {
            const songID = req.params;
            const {title, artists, tag, imagePath, audioPath} = req.body;
            const response = await songServices.editSong(songId, title, artists, tag, imagePath, audioPath);
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
    },

    getFavoriteList: async(req, res) => {
        try {
            const {userId} = req.params;

            if(!userId) {
                return res.status(400).json({
                    error: true,
                    message: "Please complete all fields"
                });
            }

            const response = await songServices.getFavoriteList(userId);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    }
}

module.exports = songController;