const pool = require("../../config/database");

module.exports = {
    createCategory: (data, callBack) => {
        pool.query(
            `insert into category(name, parent_id, image, label, price, weight_id, is_active) values(?,?,?,?,?,?,?)`,
            [
                data.name,
                data.parent_id || 0,
                data.image || '',
                data.label || '',
                data.price,
                data.weight_id,
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
    updateCategory: (data, callBack) => {
        pool.query(
            `update category set name=?, parent_id=?, image=?, label=?, price=?, weight_id=?, is_active=? where id = '${data.id}'`,
            [
                data.name,
                data.parent_id,
                data.image,
                data.label,
                data.price,
                data.weight_id,
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
    getCategory: callBack => {
        pool.query(
            `select c.id, c.name, c.parent_id, c.image, c.label, c.price, w.name as weight, c.weight_id, c.is_active, c.created_at from category c join weight_master w ON c.weight_id = w.id;`,
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