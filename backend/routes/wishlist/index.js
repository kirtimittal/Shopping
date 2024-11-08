const express = require("express");
const router = express.Router();
const WishlistController = require("../../controllers/WishlistController.js");
const protectRoute = require("../../utils/protectRoute.js");

//Add item to wishlist
router.post("/", protectRoute, WishlistController.addToWishlist);

//Get user wishlist
router.get("/:userid", protectRoute, WishlistController.getUserWishlist);

//Remove item from wishlist
router.delete("/", protectRoute, WishlistController.deleteProductFromWishlist);

module.exports = router;
