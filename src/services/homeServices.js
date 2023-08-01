const { escape } = require('mysql2');
const pool = require('../config/DBConnection');

const homeService = {
    getHome: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const [banner] = await pool.query(`
                    SELECT * FROM BANNER ORDER BY BANNER_ID DESC LIMIT 3
                `);

                const [albumTitles] = await pool.query(`
                    SELECT * 
                    FROM HOME_ALBUM 
            `   );

                const [albums] = await pool.query(`
                    SELECT * 
                    FROM ALBUM 
                    WHERE HOME_ROWINDEX IS NOT NULL AND HOME_COLUMNINDEX IS NOT NULL
                    ORDER BY HOME_ROWINDEX ASC, HOME_COLUMNINDEX ASC 
                `);

                const [songs] = await pool.query(`
                    SELECT * FROM SONG ORDER BY RELEASE_DATE DESC LIMIT 20
                `);

                resolve({
                    error: false,
                    message: 'Get home successfully',
                    data: {
                        banner,
                        albumTitles,
                        albums,
                        songs
                    }
                })

            } catch (error) {
                reject(error);
            }
        })
    },

    editHomeAlbumTitle: (albumIndex, title) => {
        return new Promise(async (resolve, reject) => {
            try {
                await pool.query(`
                    UPDATE HOME_ALBUM SET TITLE = ? WHERE ALBUM_INDEX = ?; 
                `, [title, albumIndex])


                const data = await pool.query(`
                SELECT * 
                FROM HOME_ALBUM 
                WHERE ALBUM_INDEX = ? 
                `, [albumIndex])

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

    editHomeAlbum: (albumId, homeRowIndex, homeColumnIndex, bannerIndex) => {
        return new Promise(async (resolve, reject) => {
            try {
                // bannerIndex not null
                if (bannerIndex) {
                    await pool.query(`UPDATE ALBUM SET BANNER_INDEX = null WHERE BANNER_INDEX = ?; `, [bannerIndex]);
                    await pool.query(`UPDATE ALBUM SET BANNER_INDEX = ? WHERE ALBUM_ID = ?; `, [bannerIndex, albumId]);
                }
                else {
                    await pool.query(`UPDATE ALBUM SET HOME_ROWINDEX = null, HOME_COLUMNINDEX = null 
                                        WHERE HOME_ROWINDEX = ? AND HOME_COLUMNINDEX = ?; `, [homeRowIndex, homeColumnIndex]);
                    await pool.query(`UPDATE ALBUM SET HOME_ROWINDEX = ?, HOME_COLUMNINDEX = ? WHERE ALBUM_ID = ?; `
                        , [homeRowIndex, homeColumnIndex, albumId]);

                }

                // await pool.query(`
                //     UPDATE HOME_ALBUM SET TITLE = ? WHERE ALBUM_INDEX = ?; 
                // `, [title, albumIndex])


                const [data] = await pool.query(`
                SELECT * 
                FROM ALBUM 
                WHERE ALBUM_ID = ? 
                `, [albumId])

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

module.exports = homeService;