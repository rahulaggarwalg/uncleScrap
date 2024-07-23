const { 
    createUser,
    sendOtp,
    verifyOtp,
    updateUser, 
    logoutUser,
    getUsers, 
    getUserById, 
    deleteUserById,
} = require("./user.controller");
const router = require("express").Router();

router.post("/create",createUser);
router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/update", updateUser);
router.post("/logout", logoutUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.get("/delete/:id", deleteUserById);
module.exports = router;