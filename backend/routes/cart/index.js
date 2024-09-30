const express = require("express");
const CartController = require("../../controllers/CartController.js");
//const getCategories = require("../controllers/ProductController.js");

const router = express.Router();

router.post("/add", CartController.addProductToCart);
router.get("/getItems/:userid", CartController.getCartItems);
router.delete("/delete", CartController.removeProductFromCart);

module.exports = router;
