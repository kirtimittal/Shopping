const express = require("express");
const router = express.Router();
const WishlistController = require("../../controllers/WishlistController.js");

router.post("/", WishlistController.addToWishlist);
router.get("/:userid", WishlistController.getUserWishlist);
router.delete("/", WishlistController.deleteProductFromWishlist);

module.exports = router;
