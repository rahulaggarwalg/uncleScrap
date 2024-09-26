const { 
    createCategory, 
    updateCategory, 
    getCategory, 
    getCategoryForWeb,
} = require("./category.service");

module.exports = {
    createCategory: (req, res) => {
        const body = req.body;
        body.image = req.files[0].filename;
        createCategory(body, (err, results) => {
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : err
                })
            }
            return res.status(200).json({
                success : 1,
                data : results,
                message : 'Category created successfully!'
            })
        });
    },
    updateCategory: (req, res) => {
        const body = req.body;
        body.image = req.files[0].filename;
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
    getCategoryForWeb: (req, res) => {
        getCategoryForWeb((err, results) => {
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