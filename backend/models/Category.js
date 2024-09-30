const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  img_URL: {
    type: String,
  },
  discount: {
    type: String,
  },
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: "Categories",
    default: null,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Categories = model("Categories", CategorySchema);

module.exports = Categories;
