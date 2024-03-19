const { 
    createUser,
    login,
    adminLogin,
    updateUser, 
    updatePassword,
    forgotPassword,
    getUsers, 
    getUserByEmailId, 
    deleteUser,
} = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/create",createUser);
router.post("/login", login);
router.post("/login/admin", adminLogin);
router.post("/update", checkToken, updateUser);
router.post("/update/password", checkToken, updatePassword);
router.post("/forgot/password", forgotPassword);
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserByEmailId);
router.get("/delete/:id", checkToken, deleteUser);
module.exports = router;