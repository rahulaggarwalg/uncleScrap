const { 
    createPickup, 
    updatePickup,
    getPickupById, 
    getPickup, 
} = require("./pickup.service");

module.exports = {
    createPickup: (req, res) => {
        const body = req.body;
        createPickup(body, (err, results) => {
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
    updatePickup: (req, res) => {
        const body = req.body;
        updatePickup(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            if(!results){
                return res.status(200).json({
                    success : 0,
                    message : "Failed to update pickup!"
                })
            }
            return res.status(200).json({
                success : 1,
                message : "Updated successfully!"
            })
        })
    },
    getPickupById: (req, res) => {
        const id = req.params.id;
        getPickupById(id, (err, results) => {
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
    getPickup: (req, res) => {
        getPickup((err, results) => {
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
}