const { 
    createCategory, 
    updateCategory, 
    getCategory, 
} = require("./category.service");

module.exports = {
    createCategory: (req, res) => {
        const body = req.body;
        createCategory(body, (err, results) => {
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
    updateCategory: (req, res) => {
        const body = req.body;
        updateCategory(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            if(!results){
                return res.status(200).json({
                    success : 0,
                    message : "Failed to update category!"
                })
            }
            return res.status(200).json({
                success : 1,
                message : "Updated successfully!"
            })
        })
    },
    getCategory: (req, res) => {
        getCategory((err, results) => {
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