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
                    data:  data ? data : null
                    // `SELECT * FROM ARTIST WHERE FULLNAME LIKE '%${fullname}%' AND REGION LIKE '%${region}%' AND GENDER LIKE '%${gender}%'` 
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
    },

    createArtist: (fullname, description, region, image, gender) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [items] = await pool.query(`
                INSERT INTO ARTIST (FULLNAME, DESCRIPTION, REGION, IMAGE, GENDER) 
                VALUES (?, ?, ?, ?, ?)`, [fullname, description, region, image, gender]);

                const [data] = await pool.query(`SELECT * FROM ARTIST WHERE ARTIST_ID = ?`, [items.insertId]);

                resolve({
                    error: items ? false : true,
                    message: items ? 'Created success' : 'Created error', 
                    data:  data.length > 0 ? data[0] : null 
                })
            } catch (error) {
                reject(error);
            }
        })
    },

    editArtist: (artistId, fullname, description, region, image, gender) => {
        return new Promise(async (resolve, reject) => {
            try {
                await pool.query(`
                    UPDATE ARTIST SET FULLNAME = ?, DESCRIPTION = ?, REGION = ?, IMAGE = ?,  GENDER = ?
                    WHERE ARTIST_ID = ?; 
                `, [fullname, description, region, image, gender, artistId])

                const [result] = await pool.query(`
                SELECT * 
                FROM ARTIST 
                WHERE ARTIST_ID = ? 
                `, [artistId])

                const {PASSWORD, ...data} = result[0];

                resolve({
                    error: false,
                    message: 'Update successfully.', 
                    data: data
                })
            } catch (error) {
                reject(error);
            }
        })
    },

}

module.exports = artistService;