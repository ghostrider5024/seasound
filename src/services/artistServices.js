const pool = require('../config/DBConnection');

const artistService = {

    getAllArtist: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const [data] = await pool.query(`SELECT * FROM ARTIST`);

                resolve({
                    error: data ? false : true,
                    message: data ? 'Get all artist success' : 'Not found any artist', 
                    data: data
                })
            } catch (error) {
                reject(error);
            }
        })
    },

    searchArtist: (fullname, gender, region) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [songs] = await pool.query(`
                    SELECT * 
                    FROM ARTIST 
                    WHERE FULLNAME LIKE '%${fullname}%' 
                    AND REGION LIKE '%${region}%'
                    AND GENDER LIKE '%${gender}%'
                `);


                var data;
                if(songs.length > 0) {
                    data = songs;
                }

                resolve({
                    error: data ? false : true,
                    message: data ? 'Find success' : 'Not found', 
                    data:  data ? data : `
                    SELECT * 
                    FROM ARTIST 
                    WHERE FULLNAME LIKE '%${fullname}%' 
                    AND REGION LIKE '%${region}%'
                    AND GENDER LIKE '%${gender}%'
                ` 
                })
            } catch (error) {
                reject(error);
            }
        })
    },

    artistRegions: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const [songs] = await pool.query(`
                    SELECT DISTINCT REGION 
                    FROM ARTIST 
                `);

                var data;
                if(songs.length > 0) {
                    data = songs;
                }

                resolve({
                    error: data ? false : true,
                    message: data ? 'Find success' : 'Not found', 
                    data:  data ? data : null 
                })
            } catch (error) {
                reject(error);
            }
        })
    },

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