const pool = require('../config/DBConnection');

const homeService = {
    getHome: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const [banner] = await pool.query(`
                    SELECT * FROM BANNER ORDER BY BANNER_ID DESC LIMIT 3
                `);

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
                        albums,
                        songs
                    }
                })

            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = homeService;