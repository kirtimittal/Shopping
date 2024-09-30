const express = require("express");
const ProductController = require("../controllers/ProductController.js");
//const getCategories = require("../controllers/ProductController.js");

const router = express.Router();

router.get("/products/:parentCat/:category", ProductController.getProducts);
router.post("/products", ProductController.addProducts);
router.get("/brands/:parentCat/:category", ProductController.getBrands);
router.get(
  "/getProductsByBrand/:parentCat/:category/:brands",
  ProductController.getProductsByBrand
);
router.get(
  "/getProductsByCategory/:parentCat/:category",
  ProductController.getProductsByCategory
);
router.get("/search/:searchString", ProductController.searchProduct);
router.get("/product/:id", ProductController.getProductById);
module.exports = router;
