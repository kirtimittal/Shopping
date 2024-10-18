const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actualPrice: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  discountedPrice: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  sizeAvailable: [{ type: String, required: true }],
  img_url: {
    type: String,
    required: true,
  },
  review: [
    {
      reviewId: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "Review",
      },
    },
  ],
  rating: {
    default: 0,
    required: false,
    type: Number,
  },
  numReviews: { type: Number, required: true, default: 0 },
});

const Product = model("Products", ProductSchema);

module.exports = Product;
