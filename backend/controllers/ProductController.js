const Product = require("../models/Product.js");

const getProducts = async (req, res) => {
  let { category, parentCat, searchInput } = req.params;
  let { page = 1, limit = 10 } = req.query;
  // category = category.toLowerCase();
  // parentCat = parentCat.toLowerCase();
  let products = null;
  let count = 0;
  let brands = null;
  if (parentCat !== "undefined" && category !== "undefined") {
    products = await Product.find({
      subCategory: category,
      category: parentCat,
    })
      .limit(limit)
      .skip((page - 1) * limit);
    count = await Product.countDocuments({
      subCategory: category,
      category: parentCat,
    });
    brands = await Product.find({
      subCategory: category,
      category: parentCat,
    }).distinct("brand");
  } else {
    products = await Product.find({
      $or: [
        { name: { $regex: ".*" + searchInput + ".*", $options: "i" } },
        { description: { $regex: ".*" + searchInput + ".*", $options: "i" } },
        { brand: { $regex: ".*" + searchInput + ".*", $options: "i" } },
      ],
    })
      .limit(limit)
      .skip((page - 1) * limit);
    count = await Product.countDocuments({
      $or: [
        { name: { $regex: ".*" + searchInput + ".*", $options: "i" } },
        { description: { $regex: ".*" + searchInput + ".*", $options: "i" } },
        { brand: { $regex: ".*" + searchInput + ".*", $options: "i" } },
      ],
    });
    brands = await Product.find({
      $or: [
        { name: { $regex: ".*" + searchInput + ".*", $options: "i" } },
        { description: { $regex: ".*" + searchInput + ".*", $options: "i" } },
        { brand: { $regex: ".*" + searchInput + ".*", $options: "i" } },
      ],
    }).distinct("brand");
  }
  console.log(products);
  res.json({
    products,
    totalPages: Math.ceil(count / Number(limit)),
    currentPage: Number(page),
    brands,
  });
};

const addProducts = async (req, res) => {
  const product = req.body;
  const discountedPrice =
    product.actualPrice -
    product.actualPrice * (product.discount.split("%")[0] / 100);
  const newprod = new Product({ ...product, discountedPrice });
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
  let { brands, parentCat, category, searchInput } = req.params;
  let { page = 1, limit = 10 } = req.query;
  const brnd = brands.toLowerCase().split(",");
  console.log(brnd);
  let selectedProducts = [];
  let count = 0;
  if (parentCat !== "undefined" && category !== "undefined") {
    selectedProducts = await Product.find({
      $or: brnd.map((word) => ({
        brand: { $regex: word, $options: "i" },
      })),
      subCategory: category,
      category: parentCat,
    })
      .limit(limit)
      .skip((page - 1) * limit);
    count = await Product.countDocuments({
      $or: brnd.map((word) => ({
        brand: { $regex: word, $options: "i" },
      })),
      subCategory: category,
      category: parentCat,
    });
  } else {
    selectedProducts = await Product.find({
      // $or: brnd.map((word) => ({
      //   brand: { $regex: word, $options: "i" },
      // })),
      $or: [
        { name: { $regex: ".*" + searchInput + ".*" } },
        { description: { $regex: ".*" + searchInput + ".*" } },
        { brand: { $regex: ".*" + searchInput + ".*" } },
      ],
      $or: brnd.map((word) => ({
        brand: { $regex: word, $options: "i" },
      })),
    })
      .limit(limit)
      .skip((page - 1) * limit);
    // count = await Product.countDocuments({
    //   // $or: brnd.map((word) => ({
    //   //   brand: { $regex: word, $options: "i" },
    //   // })),
    //   $or: [
    //     { name: { $regex: ".*" + searchInput + ".*", $options: "i" } },
    //     { description: { $regex: ".*" + searchInput + ".*", $options: "i" } },
    //     { brand: { $regex: ".*" + searchInput + ".*", $options: "i" } },
    //   ],
    // });
    // console.log(selectedProducts.length);
    // console.log(selectedProducts);

    // selectedProducts = selectedProducts.filter((product) =>
    //   brnd.includes(product.brand.toLowerCase())
    // );
    count = await Product.countDocuments({
      // $or: brnd.map((word) => ({
      //   brand: { $regex: word, $options: "i" },
      // })),
      $or: [
        { name: { $regex: ".*" + searchInput + ".*" } },
        { description: { $regex: ".*" + searchInput + ".*" } },
        { brand: { $regex: ".*" + searchInput + ".*" } },
      ],
      $or: brnd.map((word) => ({
        brand: { $regex: word, $options: "i" },
      })),
    });
  }
  //console.log(selectedProducts);

  //console.log(selectedProducts);
  // products.forEach((product) => {
  //   if (brands.includes(product.brand.toLowerCase())) {
  //     selectedProducts.push(product);
  //   }
  // });

  res.json({
    selectedProducts,
    totalPages: Math.ceil(count / Number(limit)),
    currentPage: Number(page),
  });
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
  let brands = await Product.find({
    subCategory: category,
    category: parentCat,
  }).distinct("brand");
  console.log(count);
  res.json({
    selectedProducts,
    totalPages: Math.ceil(count / Number(limit)),
    currentPage: Number(page),
    brands,
  });
};

const searchProduct = async (req, res) => {
  const { searchString } = req.params;
  let { page = 1, limit = 10 } = req.query;
  let selectedProducts = await Product.find({
    $or: [
      { name: { $regex: ".*" + searchString + ".*", $options: "i" } },
      { description: { $regex: ".*" + searchString + ".*", $options: "i" } },
      { brand: { $regex: ".*" + searchString + ".*", $options: "i" } },
    ],
  })
    .limit(limit)
    .skip((page - 1) * limit);
  let count = await Product.countDocuments({
    $or: [
      { name: { $regex: ".*" + searchString + ".*", $options: "i" } },
      { description: { $regex: ".*" + searchString + ".*", $options: "i" } },
      { brand: { $regex: ".*" + searchString + ".*", $options: "i" } },
    ],
  });
  let brands = await Product.find({
    $or: [
      { name: { $regex: ".*" + searchString + ".*", $options: "i" } },
      { description: { $regex: ".*" + searchString + ".*", $options: "i" } },
      { brand: { $regex: ".*" + searchString + ".*", $options: "i" } },
    ],
  }).distinct("brand");
  // products.forEach((product) => {
  //   if (
  //     product.brand.toLowerCase().includes(searchString.toLowerCase()) ||
  //     product.description.toLowerCase().includes(searchString.toLowerCase())
  //   ) {
  //     selectedProducts.push(product);
  //   }
  // });

  res.json({
    selectedProducts,
    totalPages: Math.ceil(count / Number(limit)),
    currentPage: Number(page),
    brands,
  });
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
