const { 
    createAddress,
    updateAddress, 
    getAddress, 
    getAddressById,
    deleteAddressById 
} = require("./address.controller");
const router = require("express").Router();

router.post("/create", createAddress);
router.post("/update", updateAddress);
router.get("/", getAddress);
router.get("/:id", getAddressById);
router.get("/delete/:id", deleteAddressById);
module.exports = router;