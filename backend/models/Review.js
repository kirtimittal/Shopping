const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const ReviewSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
  userid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  productid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Products",
  },
  dateAdded: {
    type: Date,
    default: new Date(),
  },
});

const Review = model("Review", ReviewSchema);

module.exports = Review;
