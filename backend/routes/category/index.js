const express = require("express");
const router = express.Router();
const Categories = require("../../controllers/CategoryController.js");

router.get("/:parentCategory", Categories.getCategory);
router.get("/", Categories.getParentCategory);
router.post("/add", Categories.addCategory);

module.exports = router;
