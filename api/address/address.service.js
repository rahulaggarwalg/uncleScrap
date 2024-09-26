const pool = require("../../config/database");

module.exports = {
    createAddress: (data, callBack) => {
        pool.query(
            `insert into address(name, is_active) values(?,?)`,
            [
                data.name,
                data.is_active
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    updateAddress: (data, callBack) => {
        pool.query(
            `update address set name=?, is_active=? where id = '${data.id}'`,
            [
                data.name,
                data.is_active
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    getAddress: callBack => {
        pool.query(
            `select id, name, is_active, created_at from address`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    getAddressById: (id, callBack) => {
        pool.query(
            `select id, name, gender, email, mobile, city, image, userType, referralCode, rewardPoint, is_verify, is_active from address where id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0])
            }
        );
    },
    deleteAddressById: (id, callBack) => {
        pool.query(
            `delete from address where id = ?`,
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