const express = require("express");
const UserController = require("../../controllers/UserController.js");
//const getCategories = require("../controllers/ProductController.js");

const router = express.Router();

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);

module.exports = router;
