const Category = require("../models/Category.js");

const getCategory = async (req, res) => {
  const { parentCategory } = req.params;
  const categories = await Category.find({ parentCategory }); //get all categories
  res.json({ status: 1, categories });
};

const getParentCategory = async (req, res) => {
  const categories = await Category.find({ parentCategory: null }); //get parent category
  res.json({ status: 1, categories });
};

const addCategory = async (req, res) => {
  const { name, description, img_URL, discount, parentCategory } = req.body;
  const newCategory = new Category({
    name,
    description,
    img_URL,
    discount,
    parentCategory,
  });
  newCategory.save().then((category) => {
    //save category
    res.json({ status: 1, category });
  });
};

module.exports = {
  getCategory,
  addCategory,
  getParentCategory,
};
