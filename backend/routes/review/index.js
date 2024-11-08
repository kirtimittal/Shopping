const express = require("express");
const router = express.Router();
const ReviewController = require("../../controllers/ReviewController");
const protectRoute = require("../../utils/protectRoute.js");

//Add a new review
router.post("/", protectRoute, ReviewController.addReview);

//Get review
router.get("/:productid/:userid", protectRoute, ReviewController.getReview);

module.exports = router;
