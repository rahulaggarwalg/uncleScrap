const pool = require("../../config/database");

module.exports = {
    createCity: (data, callBack) => {
        pool.query(
            `insert into city(name, is_active) values(?,?)`,
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
    updateCity: (data, callBack) => {
        pool.query(
            `update city set name=?, is_active=? where id = '${data.id}'`,
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
    getCity: callBack => {
        pool.query(
            `select id, name, is_active, created_at from city`,
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