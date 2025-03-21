const { 
    createAd, 
    updateAd, 
    getAd, 
} = require("./ad.service");

module.exports = {
    createAd: (req, res) => {
        const body = req.body;
        body.image = req.files[0].filename;
        createAd(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            return res.status(200).json({
                success : 1,
                data : results,
                message : 'Ad created successfully!'
            })
        });
    },
    updateAd: (req, res) => {
        const body = req.body;
        body.image = req.files && req.files[0] ? req.files[0].filename : req.body.image;
        updateAd(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            if(!results){
                return res.status(200).json({
                    success : 0,
                    message : "Failed to update ad banner!"
                })
            }
            return res.status(200).json({
                success : 1,
                message : "Updated successfully!"
            })
        })
    },
    getAd: (req, res) => {
        getAd((err, results) => {
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