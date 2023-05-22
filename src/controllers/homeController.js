const albumService = require('../services/homeServices');

const homeController = {
    getHome: async (req, res) => {
        try {
            const response = await albumService.getHome();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({error: true, message: error.message});
        }
    }
}

module.exports = homeController;