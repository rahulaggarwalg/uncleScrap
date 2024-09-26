const { 
    createAddress,
    getAddressByUserId,
    deleteAddressById 
} = require("./address.controller");
const router = require("express").Router();

router.post("/create", createAddress);
router.get("/user/:id", getAddressByUserId);
router.get("/delete/:id", deleteAddressById);
module.exports = router;