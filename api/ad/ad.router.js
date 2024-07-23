const { 
    createAd,
    updateAd, 
    getAd, 
} = require("./ad.controller");
const router = require("express").Router();

router.post("/create", createAd);
router.post("/update", updateAd);
router.get("/", getAd);
module.exports = router;