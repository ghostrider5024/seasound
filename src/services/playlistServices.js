const pool = require('../config/DBConnection');

const playlistService = {
    getAllPlaylistByUserId: (userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [playlist] = await pool.query(`
                    SELECT * FROM PLAYLIST WHERE USER_ID = ?
                `, [userId]);

                var data;
                if(playlist.length > 0) {
                    const [songs] = await pool.query(`
                        SELECT S.*, PLS.PLAYLIST_ID FROM SONG S
                        INNER JOIN PLAYLIST_SONG PLS ON PLS.SONG_ID = S.SONG_ID
                        INNER JOIN PLAYLIST P ON PLS.PLAYLIST_ID = P.PLAYLIST_ID
                        WHERE P.USER_ID = ?;
                    `, [userId]);

                    data = convertListPlaylistJson(playlist, songs);
                }

                resolve({
                    error: false,
                    message: `Get playlist by userId = ${userId} success`, 
                    data: data ? data : []
                })
            } catch (error) {
                reject(error);
            }
        });
    },

    createPlaylist: (title, image, userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [result] = await pool.query(`
                    INSERT INTO PLAYLIST (TITLE, IMAGE, USER_ID) VALUES (?, ?, ?)
                `, [title, image, userId]);

                var data
                if(result?.insertId) {
                    const [playlist] = await pool.query(`
                        SELECT * FROM PLAYLIST WHERE PLAYLIST_ID = ?
                    `, result.insertId);

                    data = {
                        ...playlist[0],
                        SONGS: []
                    }
                }                

                resolve({
                    error: data ? false : true,
                    message: data ? 'Create success' : 'Create error',
                    data: data ? data: null
                })
            } catch (error) {
                reject(error);
            }
        });
    },

    addSongToPlayList: (playlistId, songId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [result] = await pool.query(`
                    INSERT INTO PLAYLIST_SONG (PLAYLIST_ID, SONG_ID) VALUES (?, ?)     
                `, [playlistId, songId]);

                resolve({
                    error: result ? false : true,
                    message: result ? 'Inserted success' : 'Inserted error',
                })
            } catch (error) {
                reject(error);
            }
        })
    }
}

const convertPlaylistJson = (playlist, songs) => {
    const obj =  {
        ...playlist,
        SONGS: []
    }

    var total = 0;
    songs.forEach((item) => {
        if(item.PLAYLIST_ID === playlist.PLAYLIST_ID) {
            obj.SONGS.push(item)
            total++;
        }
    })

    obj.TOTAL_SONG = total;

    return obj;
}

const convertListPlaylistJson = (playlists, songs) => {
    
    const result = playlists.map((playlist) => {
        return convertPlaylistJson(playlist, songs);
    })

    return result;
}


module.exports = playlistService;