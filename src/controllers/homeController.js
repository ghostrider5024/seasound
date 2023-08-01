const albumService = require('../services/homeServices');
const homeService = require('../services/homeServices')

const homeController = {
    getHome: async (req, res) => {
        try {
            const response = await albumService.getHome();
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    },

    editHomeAlbumTitle: async (req, res) => {
        try {
            const { albumIndex, title } = req.body;
            const response = await homeService.editHomeAlbumTitle(albumIndex, title);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    },

    editHomeAlbum: async (req, res) => {
        try {
            const albumId = req.params.albumId;
            const { homeRowIndex, homeColumnIndex, bannerIndex, } = req.body;
            const response = await homeService.editHomeAlbum(albumId, homeRowIndex, homeColumnIndex, bannerIndex);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: true, message: error.message });
        }
    },
}

module.exports = homeController;