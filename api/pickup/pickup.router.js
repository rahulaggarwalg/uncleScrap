const { 
    createPickup,
    updatePickup, 
    getPickup, 
} = require("./pickup.controller");
const router = require("express").Router();

router.post("/create", createPickup);
router.post("/update", updatePickup);
router.get("/", getPickup);
module.exports = router;