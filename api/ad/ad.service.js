const pool = require("../../config/database");

module.exports = {
    createAd: (data, callBack) => {
        pool.query(
            `insert into advertisement(name, image, url) values(?,?,?)`,
            [
                data.name,
                data.image,
                data.url,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    updateAd: (data, callBack) => {
        pool.query(
            `update advertisement set name=?, image=?, url=?, is_active=? where id = '${data.id}'`,
            [
                data.name,
                data.image,
                data.url,
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
    getAd: callBack => {
        pool.query(
            `select id, name, image, url, is_active, created_at from advertisement`,
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