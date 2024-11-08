const express = require("express");
const UserController = require("../../controllers/UserController.js");

const router = express.Router();

//Register a new user
router.post("/signup", UserController.signup);

//Login and get a token
router.post("/login", UserController.login);

//Login with google and get a token
router.post("/google-login", UserController.googleLogin);

//Logout a user
router.post("/logout", UserController.logout);

//Update user profile
router.post("/update", UserController.updateProfile);

module.exports = router;
