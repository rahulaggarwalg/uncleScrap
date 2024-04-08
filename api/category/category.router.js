const { 
    createCategory,
    updateCategory, 
    getCategory, 
} = require("./category.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/create",checkToken, createCategory);
router.post("/update", checkToken, updateCategory);
router.get("/", checkToken, getCategory);
module.exports = router;