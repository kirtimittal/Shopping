const express = require("express");
const CartController = require("../../controllers/CartController.js");
const protectRoute = require("../../utils/protectRoute.js");

const router = express.Router();

//Add item to cart
router.post("/add", protectRoute, CartController.addProductToCart);

//Remove item from cart
router.get("/getItems/:userid", protectRoute, CartController.getCartItems);

//Get user products from cart
router.delete("/delete", protectRoute, CartController.removeProductFromCart);

//Empty cart
router.post("/empty", protectRoute, CartController.emptyCart);

module.exports = router;
