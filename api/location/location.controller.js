const { 
    createLocation, 
    updateLocation, 
    getLocation, 
} = require("./location.service");

module.exports = {
    createLocation: (req, res) => {
        const body = req.body;
        createLocation(body, (err, results) => {
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
    updateLocation: (req, res) => {
        const body = req.body;
        updateLocation(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            if(!results){
                return res.status(200).json({
                    success : 0,
                    message : "Failed to update location!"
                })
            }
            return res.status(200).json({
                success : 1,
                message : "Updated successfully!"
            })
        })
    },
    getLocation: (req, res) => {
        getLocation((err, results) => {
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