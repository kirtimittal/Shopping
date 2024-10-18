const Product = require("../models/Product.js");

const getProducts = async (req, res) => {
  let { category, parentCat } = req.params;
  // category = category.toLowerCase();
  // parentCat = parentCat.toLowerCase();
  const products = await Product.find({
    subCategory: category,
    category: parentCat,
  });
  res.json(products);
};

const addProducts = async (req, res) => {
  const product = req.body;
  const newprod = new Product(product);
  newprod.save().then((product) => {
    res.json(product);
  });
};

const getBrands = async (req, res) => {
  //let brands = [];
  let { parentCat, category } = req.params;
  console.log(category);
  let brands = await Product.find({
    subCategory: category,
    category: parentCat,
  }).distinct("brand");
  // let filteredProducts = products.filter(
  //   (product) => product.category.toLowerCase() === category.toLowerCase()
  // );
  // filteredProducts.forEach((product) => {
  //   if (!brands.includes(product.brand)) {
  //     brands.push(product.brand);
  //   }
  // });

  res.json(brands);
};

const getProductsByBrand = async (req, res) => {
  console.log(req.params);
  let { brands, parentCat, category } = req.params;
  const brnd = brands.toLowerCase().split(",");
  console.log(brnd);
  let selectedProducts = [];

  selectedProducts = await Product.find({
    $or: brnd.map((word) => ({
      brand: { $regex: word, $options: "i" },
    })),
    subCategory: category,
    category: parentCat,
  });

  // products.forEach((product) => {
  //   if (brands.includes(product.brand.toLowerCase())) {
  //     selectedProducts.push(product);
  //   }
  // });

  res.json(selectedProducts);
};

const getProductsByCategory = async (req, res) => {
  console.log(req.params);
  let { page = 1, limit = 10 } = req.query;
  let { category, parentCat } = req.params;
  console.log(page + "," + limit);
  // category = category.toLowerCase();
  // parentCat = parentCat.toLowerCase();
  // let selectedProducts = products.filter(
  //   (product) => product.category.toLowerCase() === category.toLowerCase()
  // );
  let selectedProducts = await Product.find({
    subCategory: category,
    category: parentCat,
  })
    .limit(limit)
    .skip((page - 1) * limit);
  let count = await Product.countDocuments({
    subCategory: category,
    category: parentCat,
  });
  console.log(count);
  res.json({
    selectedProducts,
    totalPages: Math.ceil(count / Number(limit)),
    currentPage: Number(page),
  });
};

const searchProduct = async (req, res) => {
  const { searchString } = req.params;
  let selectedProducts = await Product.find({
    $or: [
      { name: { $regex: ".*" + searchString + ".*" } },
      { description: { $regex: ".*" + searchString + ".*" } },
      { brand: { $regex: ".*" + searchString + ".*" } },
    ],
  });

  // products.forEach((product) => {
  //   if (
  //     product.brand.toLowerCase().includes(searchString.toLowerCase()) ||
  //     product.description.toLowerCase().includes(searchString.toLowerCase())
  //   ) {
  //     selectedProducts.push(product);
  //   }
  // });

  res.json(selectedProducts);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  let selectedProduct = await Product.findById({ _id: id }).populate(
    "review.reviewId"
  ); // products.find((product) => product.id == id);

  res.json(selectedProduct);
};

module.exports = {
  getProducts,
  getBrands,
  getProductsByBrand,
  searchProduct,
  getProductsByCategory,
  getProductById,
  addProducts,
};
