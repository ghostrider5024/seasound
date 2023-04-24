const songRoute = require('./songRoute');
const albumRoute = require('./albumRoute');
const authRoute = require('./authRoute');
const playlistRoute = require('./playlistRoute');

const uploadRoute = require('./uploadRoute');

const routes = [
    songRoute,
    albumRoute,
    authRoute,
    playlistRoute,
    uploadRoute
]

const router = (app)=> {
    app.use('/api', routes);
}

module.exports = router;