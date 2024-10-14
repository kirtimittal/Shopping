const Order = require("../models/Order.js");
const { v4: uuidv4 } = require("uuid");

const addOrder = async (req, res) => {
  const { userid, totalPrice, totalItems, items, shippingAddress } = req.body;
  newOrder = new Order({
    userid,
    status: "Processing",
    tracking_no: uuidv4(),
    totalPrice,
    totalItems,
    items,
    shippingAddress,
  });

  const order = await newOrder.save();
  res.json({ message: "Order placed Successfully", order });
};

const getOrders = async (req, res) => {
  const { userid } = req.params;

  const order = await Order.find({ userid });
  res.json({ order });
};

const getOrderById = async (req, res) => {};

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
};
