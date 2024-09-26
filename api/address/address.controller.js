const { 
    createAddress, 
    getAddressByUserId,
    deleteAddressById,
} = require("./address.service");

module.exports = {
    createAddress: (req, res) => {
        const body = req.body;
        createAddress(body, (err, results) => {
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
    getAddressByUserId: (req, res) => {
        const id = req.params.id;
        getAddressByUserId(id, (err, results) => {
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
    deleteAddressById: (req, res) => {
        const id = req.params.id;
        deleteAddressById(id, (err, results) => {
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