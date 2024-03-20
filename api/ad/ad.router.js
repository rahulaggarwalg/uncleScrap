const { 
    createAd,
    updateAd, 
    getAd, 
} = require("./ad.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/create",checkToken, createAd);
router.post("/update", checkToken, updateAd);
router.get("/", checkToken, getAd);
module.exports = router;