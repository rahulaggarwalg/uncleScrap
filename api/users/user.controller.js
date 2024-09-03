const { 
    createUser, 
    sendOtp,
    verifyOtp,
    updateUser,   
    logoutUser,
    getUsers, 
    getUserById, 
    deleteUserById,
} = require("./user.service");

const createOtp = () => {
    const randomNum = Math.random() * 9000;
    const otp = Math.floor(1000 + randomNum);
    return '8888';//otp;
}

const deliverOtp = (data) => {
    return true;
}

const generate_token = (length) => {
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        body.otp = createOtp();
        createUser(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            deliverOtp(body);
            return res.status(200).json({
                success : 1,
                message : 'User created successfully!'
            })
        });
    },
    sendOtp: (req, res) => {
        const body = req.body;
        body.otp = createOtp();
        sendOtp(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err,
                    data : results || []
                })
            }
            deliverOtp(body);
            return res.status(200).json({
                success : 1,
                message : "OTP sent successfully!"
            })
        })
    },
    verifyOtp: (req, res) => {
        const body = req.body;
        body.token = generate_token(32);
        verifyOtp(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            return res.status(200).json({
                success : 1,
                message : "OTP verified successfully!",
                token : body.token,
                data: results
            })
        })
    },
    updateUser: (req, res) => {
        const body = req.body;
        body.image = req.files[0].filename; 
        body.token = req.get("authorization").split(" ")[1];
        if(!body.token){
            return res.status(500).json({
                success : 0,
                message : 'Token not found!'
            })
        }
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
                message : "Updated successfully!",
                data : results
            })
        })
    },
    logoutUser: (req, res) => {
        const body = req.body;
        logoutUser(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            return res.status(200).json({
                success : 1,
                message : "User logout successfully!"
            })
        })
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
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
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
    deleteUserById: (req, res) => {
        const id = req.params.id;
        deleteUserById(id, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            return res.status(200).json({
                success : 1,
                message : "User deleted successfully!"
            })
        })
    },  
}