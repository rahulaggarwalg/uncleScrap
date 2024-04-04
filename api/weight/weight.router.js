const { 
    createWeight,
    updateWeight, 
    getWeight, 
} = require("./weight.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/create",checkToken, createWeight);
router.post("/update", checkToken, updateWeight);
router.get("/", checkToken, getWeight);
module.exports = router;