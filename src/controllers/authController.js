const authService = require('../services/authServices');
const cloudinary = require('../middleware/cloudinary');

const authController = {
    getAllUser: async (req, res) => {
        try {
            const response = await authService.getAllUser();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    login: async (req, res) => {
        try {
            const {email, password} = req.body;

            if(!email?.trim(), !password?.trim()) {
                return res.status(400).json({
                    error: true,
                    message: "Please complete all fields"
                });
            }

            const response = await authService.login(email, password);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    register: async (req, res) => {
        try {
            const {fullname, email, password} = req.body;
            const image = 'https://static.vecteezy.com/system/resources/previews/001/840/612/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg';

            if(!fullname?.trim() || !email?.trim(), !password?.trim()) {
                return res.status(400).json({
                    error: true,
                    message: "Please complete all fields"
                });
            }

            const response = await authService.register(fullname, email, password, image);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    },

    edit: async (req, res) => {
        try {
            const userId = req.params.userId;
            const {fullname, password} = req.body;
            let image;

            if(req.file.path) {
                image = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'spotify/images',
                });
            }

            console.log(image.secure_url)

            const response = await authService.edit(userId, fullname, password, image.secure_url);

            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    }
}

module.exports = authController;
