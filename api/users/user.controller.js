const { 
    createUser, 
    getUserByUserEmail,
    getUserByAdminEmail,
    updateUser, 
    updatePassword,
    forgotPassword,
    getUsers, 
    getUserByEmailId, 
    deleteUser ,
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync('1234567890', salt);
        createUser(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            return res.status(200).json({
                success : 1,
                data : results
            })
        });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            if(!results){
                return res.status(200).json({
                    success : 0,
                    message : "Invalid email!"
                })
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsonToken = sign({result : results}, process.env.HASH_KEY, {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    success : 1,
                    message : "Login successfully!",
                    token: jsonToken
                })
            }else{
                return res.status(200).json({
                    success : 0,
                    message : "Invalid password!"
                })
            }
        })
    },
    adminLogin: (req, res) => {
        const body = req.body;
        getUserByAdminEmail(body.email, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            if(!results){
                return res.status(200).json({
                    success : 0,
                    message : "Invalid email!"
                })
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsonToken = sign({result : results}, process.env.HASH_KEY, {
                    expiresIn: "1h"
                });
                return res.status(200).json({
                    success : 1,
                    message : "Login successfully!",
                    token: jsonToken
                })
            }else{
                return res.status(200).json({
                    success : 0,
                    message : "Invalid password!"
                })
            }
        })
    },
    updateUser: (req, res) => {
        const body = req.body;
        updateUser(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            if(!results){
                return res.status(200).json({
                    success : 0,
                    message : "Failed to update user!"
                })
            }
            return res.status(200).json({
                success : 1,
                message : "Updated successfully!"
            })
        })
    },
    updatePassword: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updatePassword(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            if(!results){
                return res.status(200).json({
                    success : 0,
                    message : "Failed to update password!"
                })
            }
            return res.status(200).json({
                success : 1,
                message : "Updated successfully!"
            })
        })
    },
    forgotPassword: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync('1234567890', salt);
        forgotPassword(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            return res.status(200).json({
                success : 1,
                data : results
            })
        });
    },
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            if(!results){
                return res.status(200).json({
                    success : 0,
                    message : "Record not Found!"
                })
            }
            return res.status(200).json({
                success : 1,
                data : results
            })
        })
    },
    getUserByEmailId: (req, res) => {
        const id = req.params.id;
        getUserByEmailId(id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            if(!results){
                return res.status(200).json({
                    success : 0,
                    message : "Record not Found!"
                })
            }
            return res.status(200).json({
                success : 1,
                data : results
            })
        })
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        deleteUser(id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            if(!results){
                return res.status(200).json({
                    success : 0,
                    message : "Record not Found!"
                })
            }
            return res.status(200).json({
                success : 1,
                message : "User deleted successfully!"
            })
        })
    },
    
}