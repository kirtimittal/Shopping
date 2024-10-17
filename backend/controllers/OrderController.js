const Order = require("../models/Order.js");
const { v4: uuidv4 } = require("uuid");

const addOrder = async (req, res) => {
  const { userid, totalPrice, totalItems, items, shippingAddress } = req.body;
  console.log(shippingAddress);
  newOrder = new Order({
    userid,
    status: "Processing",
    tracking_no: uuidv4(),
    totalPrice,
    totalItems,
    items,
    shippingAddress,
  });

  let order = await newOrder.save();
  let latestorder = await Order.findOne({ _id: order._id }).populate(
    "items.productid"
  );
  res.json({ message: "Order placed Successfully", order: latestorder });
};

const getOrders = async (req, res) => {
  const { userid } = req.params;

  const order = await Order.find({ userid }).populate("items.productid");
  res.json({ order });
};

const getOrderById = async (req, res) => {};

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
};
