const { 
    createCity,
    updateCity, 
    getCity, 
} = require("./city.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/create",checkToken, createCity);
router.post("/update", checkToken, updateCity);
router.get("/", checkToken, getCity);
module.exports = router;