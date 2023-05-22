const pool = require('../config/DBConnection');

const artistService = {
    getArtistById: (artistId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [info] = await pool.query(`
                    SELECT * FROM ARTIST WHERE ARTIST_ID = ?
                `, [artistId]);
 

                const [album] = await pool.query(`
                    SELECT * FROM ALBUM_ARTIST, ALBUM WHERE ARTIST_ID = ? AND ALBUM.ALBUM_ID = ALBUM_ARTIST.ALBUM_ID
                `, [artistId]);

                resolve({
                    error: false,
                    message: `Get artist with id = ${artistId} successfully`, 
                    data: {
                        artist: info[0] || null,
                        albums: album || null
                    }
                })
            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = artistService;