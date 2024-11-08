const express = require("express");
const router = express.Router();
const Categories = require("../../controllers/CategoryController.js");

//Get subcategories by parent Category
router.get("/:parentCategory", Categories.getCategory);

//Get parent category
router.get("/", Categories.getParentCategory);

//Add category
router.post("/add", Categories.addCategory);

module.exports = router;
