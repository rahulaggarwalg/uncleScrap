const pool = require("../../config/database");

module.exports = {
    createLocation: (data, callBack) => {
        pool.query(
            `insert into location(name, is_active) values(?,?)`,
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
    updateLocation: (data, callBack) => {
        pool.query(
            `update location set name=?, is_active=? where id = '${data.id}'`,
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
    getLocation: callBack => {
        pool.query(
            `select id, name, is_active, created_at from location`,
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