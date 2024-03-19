const pool = require("../../config/database");

module.exports = {
    createUser: (data, callBack) => {
        pool.query(
            `insert into user(email, password) values(?,?)`,
            [
                data.email,
                data.password,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `select * from user where email = ? and is_active=1`,
            [email],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0])
            }
        );
    },
    getUserByAdminEmail: (email, callBack) => {
        pool.query(
            `select * from user where email = ? and is_active=1 and userType = 'Admin'`,
            [email],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0])
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(
            `update user set name=?, gender=?, mobile=?, city=?, image=? where email = '${data.email}'`,
            [
                data.name,
                data.gender,
                data.mobile,
                data.city,
                data.image
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    updatePassword: (data, callBack) => {
        pool.query(
            `update user set password=? where email = '${data.email}'`,
            [
                data.password
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    forgotPassword: (data, callBack) => {
        pool.query(
            `update user set password=? where email = '${data.email}'`,
            [
                data.password
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    getUsers: callBack => {
        pool.query(
            `select id, name, gender, email, mobile, city, image from user`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    getUserByEmailId: (id, callBack) => {
        pool.query(
            `select id, name, gender, email, mobile, city, image from user where email = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0])
            }
        );
    },
    deleteUser: (id, callBack) => {
        pool.query(
            `delete from user where email = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
}