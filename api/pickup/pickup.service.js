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
            `select p.id, p.user_id, p.weight, p.message, p.date, p.time, p.is_active, p.created_at, 
            c.name as categoryName, c.id as categoryId, 
            w.name as weightName, w.id as weightId, 
            a.id as addressId, a.address_type, a.address_line_1, a.address_line_2, a.pincode, 
            ct.id as cityId, ct.name as cityName, 
            u.name as userName, u.gender, u.email, u.mobile, u.city
            from pickup p join category c ON p.category_id = c.id left join weight_master w ON p.weight_id = w.id left join user u ON p.user_id = u.id 
            left join address a ON p.address_id = a.id left join city ct ON a.city_id = ct.id;`,
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