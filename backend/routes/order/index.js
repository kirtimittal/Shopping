const express = require("express");
const router = express.Router();
const protectRoute = require("../../utils/protectRoute.js");

const OrderController = require("../../controllers/OrderController.js");

//Get all orders of a user
router.get("/:userid", protectRoute, OrderController.getOrders);

//Add order
router.post("/", protectRoute, OrderController.addOrder);

//Get single order details by Id
router.get("/:id", protectRoute, OrderController.getOrderById);

//Get all orders by searchInput
router.get(
  "/:userid/search/:input",
  protectRoute,
  OrderController.searchOrders
);

//Get all orders by status
router.get(
  "/:userid/filter/:status",
  protectRoute,
  OrderController.filterOrdersByStatus
);
module.exports = router;
