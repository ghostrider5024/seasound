const pool = require('../config/DBConnection');

const songServices = {
    getAllSong: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const [data] = await pool.query(`SELECT * FROM SONG`);

                resolve({
                    error: data ? false : true,
                    message: data ? 'Get all song success' : 'Not found any song', 
                    data: data
                })
            } catch (error) {
                reject(error);
            }
        })
    },

    getSongById: (songId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [song] = await pool.query(`SELECT * FROM SONG WHERE SONG_ID = ?`, [songId]);
                
                var data;
                if(song.length > 0) {
                    data = {...song[0]};
                    
                    const [favorites] = await pool.query(`
                        SELECT * FROM FAVORITE F
                        INNER JOIN USER U ON F.USER_ID = U.USER_ID
                        WHERE F.SONG_ID = ?
                    `, [songId]);

                    data["FAVORITE_USER"] = favorites;
                }

                resolve({
                    error: data ? false : true,
                    message: data ? 'Get song success' : 'Not found song with id = ' + songId, 
                    data:  data ? data : null 
                })
            } catch (error) {
                reject(error);
            }
        })
    },

    // createSong: (title, artists, image, songUrl) => {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const [songs] = await pool.query(`INSERT INTO SONG(TITLE, ARTIST_NAMES, IMAGE, SONG_URL, RELEASE_DATE) VALUES (?, ?, ?, ?, NOW())`, [title, artists, image, songUrl]);

    //             const [data] = await pool.query(`SELECT * FROM SONG WHERE SONG_ID = ?`, [songs.insertId]);

    //             resolve({
    //                 error: songs ? false : true,
    //                 message: songs ? 'Created success' : 'Created error', 
    //                 data:  data.length > 0 ? data[0] : null 
    //             })
    //         } catch (error) {
    //             reject(error);
    //         }
    //     })
    // },

    createSong: (title, artists, tag) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [songs] = await pool.query(`INSERT INTO SONG(TITLE, ARTIST_NAMES, TAG) VALUES (?, ?, ?)`, [title, artists, tag]);

                const [data] = await pool.query(`SELECT * FROM SONG WHERE SONG_ID = ?`, [songs.insertId]);

                resolve({
                    error: songs ? false : true,
                    message: songs ? 'Created success' : 'Created error', 
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
                    UPDATE SONG SET TITLE = ?, ARTIST_NAMES = ?, TAG = ?, IMAGE = ?, SONG_URL = ? WHERE SONG_ID = ?; 
                `, [title, artists, tag, image, audio, songId])
                
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

    deleteSong: (songId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [data] = await pool.query(`DELETE FROM SONG WHERE SONG_ID = ?`, [songId]);

                resolve({
                    error: data ? false : true,
                    message: data ? 'Dedeted success' : 'Deleted error', 
                })
            } catch (error) {
                reject(error);
            }
        })
    },

    searchSong: (songName) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [songs] = await pool.query(`
                    SELECT * FROM SONG WHERE TITLE LIKE '%${songName}%'
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

    favoriteSong: (userId, songId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [favorite] = await pool.query(`
                    SELECT * FROM FAVORITE WHERE USER_ID = ? AND SONG_ID = ?
                `, [userId, songId]);

                var isLike = false;
                if(favorite.length > 0) {
                    await pool.query(`
                        DELETE FROM FAVORITE WHERE USER_ID = ? AND SONG_ID = ?
                    `, [userId, songId]);
                    isLike = false;
                } else {
                    await pool.query(`
                    INSERT INTO FAVORITE (USER_ID, SONG_ID) VALUES (?, ?)
                    `, [userId, songId]);
                    isLike = true;
                }

                resolve({
                    error: false,
                    message: isLike ? 'Like song success' : 'Unlike song success', 
                })
            } catch (error) {
                reject(error);
            }
        })
    },

    getFavoriteList: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [favorite] = await pool.query(`
                    SELECT * FROM FAVORITE F, SONG S WHERE USER_ID = ? AND F.SONG_ID = S.SONG_ID
                `, [userId]);

                resolve({
                    error: false,
                    message: 'Get favorite list song success.',
                    data: favorite
                })
            } catch (error) {
                reject(error);
            }
        })
    } 
}

module.exports = songServices;