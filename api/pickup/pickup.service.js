const pool = require("../../config/database");

module.exports = {
    
    createPickup: (data, callBack) => {
        if(data[0].pickupId && data[0].pickupId != ""){
            pool.query(
                `update pickup set user_id=?, category_id=?, weight=?, weight_id=?, address_id=?, message=?, date=?, time=? where id = '${data[0].pickupId}'`,
                [
                    data[0].userId,
                    data[0].categoryId,
                    data[0].weight,
                    data[0].weightId,
                    data[0].addressId,
                    data[0].message || '',
                    data[0].date,
                    data[0].time
                ],
                (error, results, fields) => {
                    if(error) {
                        return callBack(error);
                    }
                    return callBack(null, results)
                }
            );
        }else{
            for (var i=0; i<data.length; i++) {
                pool.query(
                    `insert into pickup(user_id, category_id, weight, weight_id, address_id, message, date, time) values(?,?,?,?,?,?,?,?)`,
                    [
                        data[i].userId,
                        data[i].categoryId,
                        data[i].weight,
                        data[i].weightId,
                        data[i].addressId,
                        data[i].message || '',
                        data[i].date,
                        data[i].time
                    ],
                    (error, results, fields) => {
                        if(error) {
                            return callBack(error);
                        }
                    }
                );   
            }
            return callBack(null, 'Pickup created successfully')
        }
    },
    updatePickup: (data, callBack) => {
        pool.query(
            `update pickup set category_id=?, weight=?, weight_id=?, address_id=?, message=?, date=?, time=?, status=?, is_active=? where id = '${data.id}'`,
            [
                data.categoryId,
                data.weight,
                data.weightId,
                data.addressId,
                data.message || '',
                data.date,
                data.time,
                data.status,
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