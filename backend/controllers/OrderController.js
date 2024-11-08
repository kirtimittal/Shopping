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

  let order = await newOrder.save(); //add new order
  let latestorder = await Order.findOne({ _id: order._id }).populate(
    "items.productid"
  );
  res.json({ message: "Order placed Successfully", order: latestorder });
};

const getOrders = async (req, res) => {
  const { userid } = req.params;

  const order = await Order.find({ userid })
    .populate("items.productid")
    .sort({ order_date: -1 }); //get all orders
  res.json({ order });
};

const searchOrders = async (req, res) => {
  const { userid, input } = req.params;

  const orders = await Order.find({ userid })
    .populate("items.productid")
    .sort({ order_date: -1 })
    .lean();

  const filteredOrders = orders
    .map((order) => {
      return {
        ...order,
        items: order.items.filter(
          (product) =>
            product.productid.name
              .toLowerCase()
              .includes(input.toLowerCase()) ||
            product.productid.description
              .toLowerCase()
              .includes(input.toLowerCase()) ||
            product.productid.brand.toLowerCase().includes(input.toLowerCase())
        ),
      };
    })
    .filter((order) => order.items.length > 0);
  res.json({ order: filteredOrders });
};

const getOrderById = async (req, res) => {};

const filterOrdersByStatus = async (req, res) => {
  const { userid, status } = req.params;

  const orders = await Order.find({ userid, status })
    .populate("items.productid")
    .sort({ order_date: -1 });

  res.json({ order: orders });
};

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
  searchOrders,
  filterOrdersByStatus,
};
