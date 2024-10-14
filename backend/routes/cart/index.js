const express = require("express");
const CartController = require("../../controllers/CartController.js");
const protectRoute = require("../../utils/protectRoute.js");
//const getCategories = require("../controllers/ProductController.js");

const router = express.Router();

router.post("/add", protectRoute, CartController.addProductToCart);
router.get("/getItems/:userid", protectRoute, CartController.getCartItems);
router.delete("/delete", protectRoute, CartController.removeProductFromCart);
router.post("/empty", protectRoute, CartController.emptyCart);
module.exports = router;
