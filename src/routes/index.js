const songRoute = require('./songRoute');
const albumRoute = require('./albumRoute');
const authRoute = require('./authRoute');
const playlistRoute = require('./playlistRoute');

const routes = [
    songRoute,
    albumRoute,
    authRoute,
    playlistRoute
]

const router = (app)=> {
    app.use('/api', routes);
}

module.exports = router;