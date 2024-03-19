const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken : (req, res, next) => {
        let token = req.get("authorization");
        if(token){
            token = token.slice(7);
            verify(token, process.env.HASH_KEY, (err, decoded) => {
                if(err){
                    return res.status(200).json({
                        success : 0,
                        message : "Invalid token!"
                    })        
                }else{
                    next();
                }
            })
        }else{
            return res.status(200).json({
                success : 0,
                message : "Access denied, Unauthorized user!"
            })
        }
    }
}