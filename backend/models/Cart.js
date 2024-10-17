const mongoose = require("mongoose");
const model = mongoose.model;
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  items: [
    {
      productid: {
        type: Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      qty: {
        type: Number,
        default: 1,
        min: 1,
      },
    },
  ],
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
});

const Cart = model("Cart", CartSchema);

module.exports = Cart;
