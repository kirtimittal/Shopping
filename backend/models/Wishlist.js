const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const WishlistSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  productid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "products",
  },
  date_time: {
    type: Date,
    default: Date.now,
  },
});

const Wishlist = model("Wishlist", WishlistSchema);
module.exports = Wishlist;
