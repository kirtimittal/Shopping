const express = require("express");
const router = express.Router();
const ReviewController = require("../../controllers/ReviewController");
const protectRoute = require("../../utils/protectRoute.js");

router.post("/", protectRoute, ReviewController.addReview);
router.get("/:productid/:userid", protectRoute, ReviewController.getReview);

module.exports = router;
