const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const OrderSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
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
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalItems: {
    type: Number,
    required: true,
    default: 0,
  },
  items: [
    {
      productid: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Products",
      },
      name: {
        type: String,
      },
      size: {
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
    street: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
    state: { type: String },
  },
});

const Order = model("Order", OrderSchema);

module.exports = Order;
