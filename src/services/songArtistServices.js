const pool = require('../config/DBConnection');

const songArtistServices = {

    getSongArtists: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const [data] = await pool.query(`SELECT * FROM SONG_ARTIST ORDER BY SONG_ID`);

                resolve({
                    error: data ? false : true,
                    message: data ? 'Get all song success' : 'Not found any data', 
                    data: data
                })
            } catch (error) {
                reject(error);
            }
        })
    },

    createSongAritst: (songId, artistId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [songArtist] = await pool.query(`INSERT INTO SONG_ARTIST(SONG_ID, ARTIST_ID) VALUES (?, ?)`, [songId, artistId]);

                const [data] = await pool.query(`SELECT * FROM SONG_ARTIST WHERE SONG_ID = ?  AND ARTIST_ID = ?`, [songId, artistId]);

                resolve({
                    error: songArtist ? false : true,
                    message: songArtist ? 'Created success' : 'Created error', 
                    data:  data.length > 0 ? data[0] : null 
                })
            } catch (error) {
                reject(error);
            }
        })
    },


    editSong: (songId, title, artists, tag, image, audio) => {
        return new Promise(async (resolve, reject) => {
            try {
                await pool.query(`
                    UPDATE SONG SET TITLE = ?, ARTIST_NAMES = ?, TAG = ? WHERE SONG_ID = ?; 
                `, [title, artists, tag, songId])
                
                if(image !== null) {
                    await pool.query(`
                    UPDATE SONG SET IMAGE = ? WHERE SONG_ID = ?; 
                `, [image, songId])
                }

                if(audio !== null){
                    await pool.query(`
                    UPDATE SONG SET SONG_URL = ? WHERE SONG_ID = ?; 
                `, [audio, songId])
                }

                const [result] = await pool.query(`
                SELECT * 
                FROM SONG 
                WHERE SONG_ID = ? 
                `, [songId])

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

    deleteSongAritst: (songId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [data] = await pool.query(`DELETE FROM SONG_ARTIST WHERE SONG_ID = ?`, [songId]);

                resolve({
                    error: data ? false : true,
                    message: data ? 'Dedeted success' : 'Deleted error', 
                })
            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = songArtistServices;