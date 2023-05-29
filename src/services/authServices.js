const pool = require('../config/DBConnection');

const authService = {

    getAllUser: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const [auth] = await pool.query(`
                    SELECT U.*, R.ROLE_NAME FROM USER U
                    INNER JOIN ROLE R ON U.ROLE_ID = R.ROLE_ID;
                `);

                resolve({
                    error: false,
                    message: 'Get all user success', 
                    data: auth
                })
            } catch (error) {
                reject(error);
            }
        });
    },

    login: (email, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [auth] = await pool.query(`
                    SELECT U.*, R.ROLE_NAME FROM USER U, ROLE R
                    WHERE 
                        U.ROLE_ID = R.ROLE_ID AND
                        U.EMAIL = ? AND 
                        U.PASSWORD = ?
                `, [email, password]);

                var data;
                if(auth.length > 0) {
                    data = auth[0]
                }else {
                    return reject({
                        message: "Email or password is incorrect"
                    })
                }

                resolve({
                    error: data ? false : true,
                    message: data ? 'Login success' : 'Invalid email or password', 
                    data: data
                })
            } catch (error) {
                reject(error);
            }

        });
    },

    register: (fullName, email, password, image) => {
        return new Promise(async (resolve, reject) => {
            try {
                const [result] = await pool.query(`
                    INSERT INTO USER (FULLNAME, EMAIL, PASSWORD, IMAGE) VALUES (?, ?, ?, ?)
                `, [fullName, email, password, image]);

                console.log(result)

                var data;
                if(result?.insertId) {
                    const [auth] = await pool.query(`
                        SELECT U.*, R.ROLE_NAME FROM USER U
                        INNER JOIN ROLE R ON U.ROLE_ID = R.ROLE_ID
                        WHERE U.USER_ID = ?
                    `, [result.insertId]);
                    data = auth[0];
                }

                resolve({
                    error: data ? false : true,
                    message: data ? 'Register success' : 'Error! Email or password already exists.', 
                    data: data ? data : null
                })
            } catch (error) {
                reject(error);
            }

        });
    },

    edit: (userId, fullName, image = null) => {
        return new Promise(async (resolve, reject) => {
            try {
                await pool.query(`
                    UPDATE USER SET FULLNAME = ? WHERE USER_ID = ?; 
                `, [fullName, userId])
                
                if(image !== null) {
                    await pool.query(`
                        UPDATE USER SET IMAGE = ? WHERE USER_ID = ?; 
                    `, [image, userId])
                }

                const [result] = await pool.query(`
                SELECT U.*, R.ROLE_NAME FROM USER U, ROLE R
                WHERE 
                    U.ROLE_ID = R.ROLE_ID AND
                    U.USER_ID = ?
                `, [userId])

                const {PASSWORD, ...profile} = result[0];

                resolve({
                    error: false,
                    message: 'Update successfully.', 
                    data: profile
                })
            } catch (error) {
                reject(error);
            }
        })
    }
}

module.exports = authService;