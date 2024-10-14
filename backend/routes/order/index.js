const express = require("express");
const router = express.Router();
const protectRoute = require("../../utils/protectRoute.js");

const OrderController = require("../../controllers/OrderController.js");

router.get("/:userid", protectRoute, OrderController.getOrders);

router.post("/", protectRoute, OrderController.addOrder);

router.get("/:id", OrderController.getOrderById);

module.exports = router;
