const pool = require("../../config/database");

module.exports = {
    createWeight: (data, callBack) => {
        pool.query(
            `insert into weight_master(name, is_active) values(?,?)`,
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
    updateWeight: (data, callBack) => {
        pool.query(
            `update weight_master set name=?, is_active=? where id = '${data.id}'`,
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
    getWeight: callBack => {
        pool.query(
            `select id, name, is_active, created_at from weight_master`,
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