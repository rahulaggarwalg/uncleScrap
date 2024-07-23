const { 
    createCity,
    updateCity, 
    getCity, 
} = require("./city.controller");
const router = require("express").Router();

router.post("/create", createCity);
router.post("/update", updateCity);
router.get("/", getCity);
module.exports = router;