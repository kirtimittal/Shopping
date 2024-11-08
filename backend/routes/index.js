const express = require("express");
const ProductController = require("../controllers/ProductController.js");

const router = express.Router();

//Get all products by category and subcategory or by search field.
router.get(
  "/products/:parentCat/:category/:searchInput",
  ProductController.getProducts
);

//Add product
router.post("/products", ProductController.addProducts);

//Get all brands by category and subcategory
router.get("/brands/:parentCat/:category", ProductController.getBrands);

//Get all products by brand
router.get(
  "/getProductsByBrand/:parentCat/:category/:brands/:searchInput",
  ProductController.getProductsByBrand
);

//get products by category
router.get(
  "/getProductsByCategory/:parentCat/:category",
  ProductController.getProductsByCategory
);

//Get all products by search Input
router.get("/search/:searchString", ProductController.searchProduct);

//Get a single product by ID
router.get("/product/:id", ProductController.getProductById);

module.exports = router;
