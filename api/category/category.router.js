const { 
    createCategory,
    updateCategory, 
    getCategory, 
    getCategoryForWeb,
} = require("./category.controller");
const router = require("express").Router();

router.post("/create", createCategory);
router.post("/update", updateCategory);
router.get("/", getCategory);
router.get("/all", getCategoryForWeb);
module.exports = router;