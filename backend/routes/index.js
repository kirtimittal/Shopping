const express = require("express");
const ProductController = require("../controllers/ProductController.js");
//const getCategories = require("../controllers/ProductController.js");

const router = express.Router();

router.get(
  "/products/:parentCat/:category/:searchInput",
  ProductController.getProducts
);
router.post("/products", ProductController.addProducts);
router.get("/brands/:parentCat/:category", ProductController.getBrands);
router.get(
  "/getProductsByBrand/:parentCat/:category/:brands/:searchInput",
  ProductController.getProductsByBrand
);
router.get(
  "/getProductsByCategory/:parentCat/:category",
  ProductController.getProductsByCategory
);
router.get("/search/:searchString", ProductController.searchProduct);
router.get("/product/:id", ProductController.getProductById);
module.exports = router;
