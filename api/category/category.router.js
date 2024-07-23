const { 
    createCategory,
    updateCategory, 
    getCategory, 
} = require("./category.controller");
const router = require("express").Router();

router.post("/create", createCategory);
router.post("/update", updateCategory);
router.get("/", getCategory);
module.exports = router;