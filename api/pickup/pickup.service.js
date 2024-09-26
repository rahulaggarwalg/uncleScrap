const pool = require("../../config/database");

module.exports = {
    createPickup: (data, callBack) => {
        pool.query(
            `insert into pickup(name, is_active) values(?,?)`,
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
    updatePickup: (data, callBack) => {
        pool.query(
            `update pickup set name=?, is_active=? where id = '${data.id}'`,
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
    getPickup: callBack => {
        pool.query(
            `select id, name, is_active, created_at from pickup`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
}