const express = require("express");
const {registerUser,authuser,updateUserProfile}=require('../controllers/userController')
const { protect } = require("../middlewares/authMiddleWare");
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authuser);
router.route("/profile").post(protect,updateUserProfile)
// router.route("/api/login").post(authuser);

module.exports = router;
