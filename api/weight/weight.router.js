const { 
    createWeight,
    updateWeight, 
    getWeight, 
} = require("./weight.controller");
const router = require("express").Router();

router.post("/create", createWeight);
router.post("/update", updateWeight);
router.get("/", getWeight);
module.exports = router;