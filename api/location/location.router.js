const { 
    createLocation,
    updateLocation, 
    getLocation, 
} = require("./location.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/create",checkToken, createLocation);
router.post("/update", checkToken, updateLocation);
router.get("/", checkToken, getLocation);
module.exports = router;