const express = require("express");
const router = express.Router();
const WishlistController = require("../../controllers/WishlistController.js");
const protectRoute = require("../../utils/protectRoute.js");

router.post("/", protectRoute, WishlistController.addToWishlist);
router.get("/:userid", protectRoute, WishlistController.getUserWishlist);
router.delete("/", protectRoute, WishlistController.deleteProductFromWishlist);

module.exports = router;
