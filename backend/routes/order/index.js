const express = require("express");
const router = express.Router();
const protectRoute = require("../../utils/protectRoute.js");

const OrderController = require("../../controllers/OrderController.js");

router.get("/:userid", protectRoute, OrderController.getOrders);

router.post("/", protectRoute, OrderController.addOrder);

router.get("/:id", protectRoute, OrderController.getOrderById);
router.get(
  "/:userid/search/:input",
  protectRoute,
  OrderController.searchOrders
);
router.get(
  "/:userid/filter/:status",
  protectRoute,
  OrderController.filterOrdersByStatus
);
module.exports = router;
