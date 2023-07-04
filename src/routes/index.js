const songRoute = require('./songRoute');
const albumRoute = require('./albumRoute');
const authRoute = require('./authRoute');
const playlistRoute = require('./playlistRoute');
const homeRoute = require('./homeRoute');
const artistRoute = require('./artistRoute');
const songArtistRoute = require('./songArtistRoute');

const uploadRoute = require('./uploadRoute');

const routes = [
    songRoute,
    albumRoute,
    authRoute,
    playlistRoute,
    uploadRoute,
    artistRoute,
    homeRoute,
    songArtistRoute
]

const router = (app)=> {
    app.use('/api', routes);
}

module.exports = router;