const Product = require("../models/Product.js");

const getProducts = async (req, res) => {
  let { category, parentCat, searchInput } = req.params;
  let { page = 1, limit = 10 } = req.query;
  let products = null;
  let count = 0;
  let brands = null;

  if (parentCat !== "undefined" && category !== "undefined") {
    //if category and parent category is present
    products = await Product.find({
      //get products by category and parent category
      subCategory: category,
      category: parentCat,
    })
      .limit(limit)
      .skip((page - 1) * limit);
    //count documents
    count = await Product.countDocuments({
      subCategory: category,
      category: parentCat,
    });

    //get brands
    brands = await Product.find({
      subCategory: category,
      category: parentCat,
    }).distinct("brand");
  } else {
    products = await Product.find({
      //get products by saerch string
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
  const newprod = new Product({ ...product, discountedPrice }); //add product
  newprod.save().then((product) => {
    res.json(product);
  });
};

const getBrands = async (req, res) => {
  //let brands = [];
  let { parentCat, category } = req.params;
  let brands = await Product.find({
    subCategory: category,
    category: parentCat,
  }).distinct("brand"); //get all brands
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
  let { brands, parentCat, category, searchInput } = req.params;
  let { page = 1, limit = 10 } = req.query;
  const brnd = brands.toLowerCase().split(",");

  let selectedProducts = [];
  let count = 0;
  if (parentCat !== "undefined" && category !== "undefined") {
    //if category and parent category is present
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
      //else find by saerch string
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

    count = await Product.countDocuments({
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

  res.json({
    selectedProducts,
    totalPages: Math.ceil(count / Number(limit)),
    currentPage: Number(page),
  });
};

const getProductsByCategory = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  let { category, parentCat } = req.params;

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

  res.json({
    selectedProducts,
    totalPages: Math.ceil(count / Number(limit)),
    currentPage: Number(page),
    brands,
  });
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  let selectedProduct = await Product.findById({ _id: id }).populate(
    "review.reviewId"
  );

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
