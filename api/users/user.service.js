const pool = require("../../config/database");

module.exports = {
    createUser: (data, callBack) => {
        const randomNum = Math.floor(1000000 + Math.random() * 9000000);
        pool.query(
            `select * from user where referralCode = ?`,
            [data.referralCode || null],
            (refError, refResults) => {
                if(refError){
                    return callBack(refError);
                }
                pool.query(
                    `insert into user(email, otp, mobile, referralCode, rewardPoint) values(?,?,?,?,?)`,
                    [
                        data.email || '',
                        data.otp,
                        data.mobile || '',
                        data.referralCode = 'SCRAP'+randomNum,
                        data.rewardPoint = refResults.length > 0 ? 200 : '',
                    ],
                    (error, results) => {
                        if(error) {
                            let code = error.code;
                            let message = error.sqlMessage;
                            if(code === 'ER_DUP_ENTRY'){
                                message = 'Duplicate entry. The record you are trying to add already exists in the database.';
                            }
                            return callBack(message);
                        }
                        return callBack(null, results);
                    }
                );
            }
        );
    },
    sendOtp: (data, callBack) => {
        pool.query(
            `select * from user where (email = '${data.email || ''}' or mobile = ${data.mobile || ''}) and is_active=1`,
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                let message = '';
                if(results.length === 0){
                    message = 'No user found!';
                    return callBack(message);
                }else{
                    if(results[0].token){
                        message = 'User is already login!';
                        return callBack(message, results);
                    }
                    pool.query(
                        `update user set otp=?, is_verify='' where (email = '${data.email || ''}' or mobile = ${data.mobile || ''})`,
                        [
                            data.otp
                        ],
                        (otpError, otpResults) => {
                            if(otpError) {
                                return callBack(otpError);
                            }
                            return callBack(null, results[0])
                        }
                    );
                }
                
            }
        );
    },
    verifyOtp: (data, callBack) => {
        pool.query(
            `select id, name, gender, otp, email, mobile, city, image, userType, referralCode, rewardPoint from user where (email = '${data.email || ''}' or mobile = ${data.mobile || ''}) and is_active=1`,
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                let message = '';
                if(results.length === 0){
                    message = 'No user found!';
                    return callBack(message);
                }else{
                    if(results[0].otp != data.otp){
                        message = 'OTP is wrong!';
                        return callBack(message);
                    }
                    pool.query(
                        `update user set is_verify=1, token=? where (email = '${data.email || ''}' or mobile = ${data.mobile || ''})`,
                        [
                            data.token
                        ],
                        (otpError, otpResults) => {
                            if(otpError) {
                                return callBack(otpError);
                            }
                            return callBack(null, results[0])
                        }
                    );
                }
                
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(
            `select token from user where (email = '${data.email || ''}' or mobile = ${data.mobile || ''}) and is_active=1`,
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                if(results[0].token != data.token){
                    let message = 'Token Mismatch!';
                    return callBack(message);
                }
                pool.query(
                    `update user set name=?, gender=?, mobile=?, city=?, image=?, email=? where id = '${data.id}'`,
                    [
                        data.name,
                        data.gender,
                        data.mobile,
                        data.city,
                        data.image || '',
                        data.email
                    ],
                    (error, results, fields) => {
                        if(error) {
                            return callBack(error);
                        }
                        pool.query(
                            `select id, name, gender, otp, email, mobile, city, image, userType, referralCode, rewardPoint from user where (email = '${data.email || ''}' or mobile = ${data.mobile || ''}) and is_active=1`,
                            (getError, getResults) => {
                                if(getError) {
                                    return callBack(getError);
                                }
                                return callBack(null, getResults[0])
                            }
                        );
                    }
                );
                
            }
        );
    },
    logoutUser: (data,callBack) => {
        pool.query(
            `update user set token='' where (email = '${data.email || ''}' or mobile = ${data.mobile || ''})`,
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    getUsers: callBack => {
        pool.query(
            `select id, name, gender, email, mobile, city, image, userType, referralCode, rewardPoint, is_verify, is_active from user`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results)
            }
        );
    },
    getUserById: (id, callBack) => {
        pool.query(
            `select id, name, gender, email, mobile, city, image, userType, referralCode, rewardPoint, is_verify, is_active from user where id = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error);
                }
                return callBack(null, results[0])
            }
        );
    },
    deleteUserById: (id, callBack) => {
        pool.query(
            `delete from user where id = ?`,
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