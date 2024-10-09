const pool = require("../../config/database");

module.exports = {
    createPickup: (data, callBack) => {
        if(data.pickup_id){
            pool.query(
                `update pickup set user_id=?, category_id=?, weight=?, weight_id=?, address_id=?, message=?, date=?, time=? where id = '${data.pickup_id}'`,
                [
                    data.user_id,
                    data.category_id,
                    data.weight,
                    data.weight_id,
                    data.address_id,
                    data.message || '',
                    data.date,
                    data.time
                ],
                (error, results, fields) => {
                    if(error) {
                        return callBack(error);
                    }
                    return callBack(null, results)
                }
            );
        }else{
            pool.query(
                `insert into pickup(user_id, category_id, weight, weight_id, address_id, message, date, time) values(?,?,?,?,?,?,?,?)`,
                [
                    data.user_id,
                    data.category_id,
                    data.weight,
                    data.weight_id,
                    data.address_id,
                    data.message || '',
                    data.date,
                    data.time
                ],
                (error, results, fields) => {
                    if(error) {
                        return callBack(error);
                    }
                    return callBack(null, results)
                }
            );
        }
    },
    updatePickup: (data, callBack) => {
        pool.query(
            `update pickup set category_id=?, weight=?, weight_id=?, address_id=?, message=?, date=?, time=?, status=?, is_active=? where id = '${data.id}'`,
            [
                data.category_id,
                data.weight,
                data.weight_id,
                data.address_id,
                data.message || '',
                data.date,
                data.time,
                data.staus,
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
    getPickupById: (data,callBack) => {
        pool.query(
            `select p.id, p.user_id, p.weight, p.message, p.date, p.time, p.status, p.is_active, p.created_at, 
            c.name as categoryName, c.id as categoryId, 
            w.name as weightName, w.id as weightId, 
            a.id as addressId, a.address_type, a.address_line_1, a.address_line_2, a.pincode, 
            ct.id as cityId, ct.name as cityName, 
            u.name as userName, u.gender, u.email, u.mobile, u.city
            from pickup p join category c ON p.category_id = c.id left join weight_master w ON p.weight_id = w.id left join user u ON p.user_id = u.id 
            left join address a ON p.address_id = a.id left join city ct ON a.city_id = ct.id where p.user_id = ? and p.status = ?`,
            [data.id, data.statusId],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    getPickup: (callBack) => {
        pool.query(
            `select p.id, p.user_id, p.weight, p.message, p.date, p.time, p.status, p.is_active, p.created_at, 
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