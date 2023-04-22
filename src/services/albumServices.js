const pool = require('../config/DBConnection');

const albumService = {
    getAllAlbum: () => {
        return new Promise(async (resolve, reject) => {
            try {

                const [albums] = await pool.query(`SELECT * FROM ALBUM;`);

                const [songs] = await pool.query(`
                    SELECT * FROM SONG, ALBUM_SONG
                    WHERE SONG.SONG_ID = ALBUM_SONG.SONG_ID;
                `);

                const data = convertListAlbumJson(albums, songs);

                resolve({
                    error: data ? false : true,
                    message: data ? 'Get all allbum success' : 'Not found any allbum', 
                    data: data
                })
            } catch (error) {
                reject(error)
            }
        })
    },
    
    getAlbumById: (albumId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [album] = await pool.query(`SELECT * FROM ALBUM WHERE ALBUM_ID = ?`, [albumId]);

                const [songs] = await pool.query(`SELECT * FROM SONG, ALBUM_SONG
                WHERE SONG.SONG_ID = ALBUM_SONG.SONG_ID;`);

                var data;
                if(album[0]?.ALBUM_ID) {
                    data = convertAblumJson(album[0], songs);
                }

                resolve({
                    error: data ? false : true,
                    message: data ? 'Get album success' : 'Not found album with id = ' + albumId, 
                    data:  data ? data : null 
                })
            } catch (error) {
                reject(error)
            }
        })
    },
    
    createAlbum: (title, description, image, songsId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [result] = await pool.query(`INSERT INTO ALBUM(TITLE, DESCRIPTION, IMAGE, RELEASE_DATE, TOTAL_LISTEN) VALUES (?, ?, ?, NOW(), 0)`, [title, description, image]);

                songsId.forEach(async songId => {
                    await pool.query(`INSERT INTO ALBUM_SONG(ALBUM_ID, SONG_ID) VALUES (?, ?)`, [result.insertId, songId])
                });

                const [data] = await pool.query(`
                SELECT 
                a.ALBUM_ID, a.TITLE, a.DESCRIPTION, a.IMAGE, a.RELEASE_DATE,
                JSON_ARRAYAGG(JSON_OBJECT(
                    'SONG_ID', s.SONG_ID,
                    'TITLE', s.TITLE,
                    'ARTIST_NAMES', s.ARTIST_NAMES,
                    'IMAGE', s.IMAGE,
                    'SONG_URL', s.SONG_URL,
                    'RELEASE_DATE', s.RELEASE_DATE
                )) AS SONGS
                FROM ALBUM a
                INNER JOIN ALBUM_SONG albs ON a.ALBUM_ID = albs.ALBUM_ID
                INNER JOIN SONG s ON albs.SONG_ID = s.SONG_ID
                WHERE a.ALBUM_ID = ?
                GROUP BY a.ALBUM_ID`, [result.insertId])

                console.log(data)

                resolve({
                    error: result?.insertId ? false : true,
                    message: result?.insertId ? 'Created success' : 'Created error',
                    data: data.length > 0 ? data[0] : null
                })
            } catch (error) {
                reject(error);
            }
        })
    },

    addSongToAlbum: (albumId, songId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [result] = await pool.query(`INSERT INTO ALBUM_SONG(ALBUM_ID, SONG_ID) VALUES (?, ?)`, [albumId, songId]);

                resolve({
                    error: result ? false : true,
                    message: result ? 'Inserted success' : 'Inserted error',
                })
            } catch (error) {
                reject(error);
            }
        })
    },
    
    deleteAlbum: () => {},

}

const convertAblumJson = (album, songs) => {
    const obj =  {
        ...album,
        SONGS: []
    }

    songs.forEach((item) => {
        if(item.ALBUM_ID === album.ALBUM_ID) {
            obj.SONGS.push(item)
        }
    })

    return obj;
}

const convertListAlbumJson = (albums, songs) => {
    
    const result = albums.map((album) => {
        return convertAblumJson(album, songs);
    })

    return result;
}

module.exports = albumService;