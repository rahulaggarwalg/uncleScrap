const { 
    createUser, 
    getUserByUserId, 
    getUsers, 
    updateUser, 
    deleteUser ,
    getUserByUserEmail
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        createUser(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database Connection Error!"
                })
            }
            return res.status(200).json({
                success : 1,
                data : results
            })
        });
    },
    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database Connection Error!"
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
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database Connection Error!"
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
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database Connection Error!"
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
    deleteUser: (req, res) => {
        const body = req.body;
        deleteUser(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database Connection Error!"
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
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "Database Connection Error!"
                })
            }
            if(!results){
                return res.status(200).json({
                    success : 0,
                    message : "Invalid email or password!"
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
                    message : "Invalid email or password!"
                })
            }
        })
    }
}