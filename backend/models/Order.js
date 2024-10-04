const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const OrderSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  order_date: { type: Date, default: new Date() },
  status: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    required: true,
  },
  tracking_no: {
    type: String,
  },
  items: [
    {
      productid: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "products",
      },
      name: {
        type: String,
      },
      qty: {
        type: Number,
        required: true,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
});

const Order = model("Order", OrderSchema);

module.exports = Order;
