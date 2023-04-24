const cloudinary = require('../middleware/cloudinary');

const uploadController = {
    uploadSong: async (req, res) => {
        try {
            console.log('Song: ', req.file)
            if(!req.file) return res.status(400).json({msg: 'Need file to upload.'})

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'spotify/songs',
                chunk_size: 6000000,
                resource_type: "video", 
            });

            res.status(200).json({
                error: false,
                message: 'Upload successfully',
                data: {
                    SONG_URL: result.secure_url
                }
            })
        } catch (error) {
            res.status(500).json({
                error: true,
                message: error.message
            });
        }
    },

    uploadImage: async (req, res) => {
        try {
            console.log('Image: ', req.file)
            if(!req.file) return res.status(400).json({msg: 'Need file to upload.'})

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'spotify/images',
            });

            res.status(200).json({
                error: false,
                message: 'Upload successfully',
                data: {
                    SONG_URL: result.secure_url
                }
            })
        } catch (error) {
            res.status(500).json({
                error: true,
                message: error.message
            });
        }
    }

}

module.exports = uploadController;