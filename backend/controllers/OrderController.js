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

  const order = await Order.find({ userid })
    .populate("items.productid")
    .sort({ order_date: -1 });
  res.json({ order });
};

const searchOrders = async (req, res) => {
  const { userid, input } = req.params;

  const orders = await Order.find({ userid })
    .populate("items.productid")
    .sort({ order_date: -1 });

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
    .filter((order) => order.items.length > 0)
    .map((order) => order._doc);
  console.log(filteredOrders);
  res.json({ order: filteredOrders });

  // products.forEach((product) => {
  //   if (
  //     product.brand.toLowerCase().includes(searchString.toLowerCase()) ||
  //     product.description.toLowerCase().includes(searchString.toLowerCase())
  //   ) {
  //     selectedProducts.push(product);
  //   }
  // });
};

const getOrderById = async (req, res) => {};

const filterOrdersByStatus = async (req, res) => {
  const { userid, status } = req.params;

  const orders = await Order.find({ userid, status })
    .populate("items.productid")
    .sort({ order_date: -1 });

  res.json({ order: orders });

  // products.forEach((product) => {
  //   if (
  //     product.brand.toLowerCase().includes(searchString.toLowerCase()) ||
  //     product.description.toLowerCase().includes(searchString.toLowerCase())
  //   ) {
  //     selectedProducts.push(product);
  //   }
  // });
};

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
  searchOrders,
  filterOrdersByStatus,
};
