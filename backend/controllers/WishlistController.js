const Wishlist = require("../models/Wishlist.js");
const mongoose = require("mongoose");

const addToWishlist = async (req, res) => {
  const { productid, userid } = req.body;
  const useridobj = new mongoose.Types.ObjectId(userid);
  const productidobj = new mongoose.Types.ObjectId(productid);
  const item = await Wishlist.find({ productid, userid });
  console.log(useridobj + " " + productidobj);
  if (item.length !== 0) {
    res.status(409).json({ message: "Item is already present in wishlist" });
  } else {
    const newItem = new Wishlist({
      productid: productidobj,
      userid: useridobj,
    });

    const itemAdded = await newItem.save();
    res.json(itemAdded);
  }
};

const getUserWishlist = async (req, res) => {
  const { userid } = req.params;
  console.log(userid);
  const products = await Wishlist.find(
    { userid },
    { productid: 1, _id: 0 }
  ).distinct("productid");
  console.log(products);
  res.json(products);
};

const deleteProductFromWishlist = async (req, res) => {
  const { productid, userid } = req.body;
  const useridobj = new mongoose.Types.ObjectId(userid);
  const productidobj = new mongoose.Types.ObjectId(productid);
  const item = await Wishlist.find({ productid, userid });
  console.log(item);
  if (item.length === 0) {
    res.status(404).json({ message: "Item is not present in wishlist" });
  } else {
    const deletedItem = await Wishlist.findByIdAndDelete({ _id: item[0]._id });
    res.json({ message: "Deleted Successfully", deletedItem });
  }
};

module.exports = {
  addToWishlist,
  getUserWishlist,
  deleteProductFromWishlist,
};
