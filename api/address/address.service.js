const pool = require("../../config/database");

module.exports = {
    createAddress: (data, callBack) => {
        pool.query(
            `insert into address(user_id, address_type, address_line_1, address_line_2, pincode, city_id) values(?,?,?,?,?,?)`,
            [
                data.user_id,
                data.address_type,
                data.address_line_1,
                data.address_line_2,
                data.pincode,
                data.city_id
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    getAddressByUserId: (id, callBack) => {
        pool.query(
            `select a.id, a.user_id, a.address_type, a.address_line_1, a.address_line_2, a.pincode, a.city_id, a.created_at, c.name as city from address a join city c ON a.city_id = c.id where a.user_id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results)
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