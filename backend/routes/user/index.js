const express = require("express");
const UserController = require("../../controllers/UserController.js");
//const getCategories = require("../controllers/ProductController.js");

const router = express.Router();

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post("/google-login", UserController.googleLogin);
router.post("/logout", UserController.logout);
router.post("/update", UserController.updateProfile);
module.exports = router;
