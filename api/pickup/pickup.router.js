const { 
    createPickup,
    updatePickup, 
    getPickupById, 
    getPickup, 
} = require("./pickup.controller");
const router = require("express").Router();

router.post("/create", createPickup);
router.post("/update/:id", updatePickup);
router.get("/:id/:statusId", getPickupById);
router.get("/", getPickup);
module.exports = router;