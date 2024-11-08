const Cart = require("../models/Cart.js");
const Product = require("../models/Product.js");

const addProductToCart = async (req, res) => {
  const { userid, productid, qty, size } = req.body;
  let cart = await Cart.findOne({ userid }); //fing cart with userid
  if (cart) {
    //if cart exists
    const productIndex = cart.items.findIndex(
      (item) => item.productid == productid && item.size === size
    ); //find if product already exists in cart

    if (productIndex > -1) {
      //if yes increase the qty by 1
      cart.items[productIndex].qty =
        cart.items[productIndex].qty + parseInt(qty);
    } else {
      //else add item to cart
      cart.items.push({
        productid,
        qty,
        size,
      });
    }
  } else {
    //if cart does not exist,create new
    cart = new Cart({
      userid,
      items: [{ productid, qty, size }],
    });
  }

  let totalPrice = 0;

  for (let item of cart.items) {
    const product = await Product.findById({ _id: item.productid });

    if (product) {
      totalPrice = totalPrice + product.discountedPrice * item.qty; //calc total price
    }
  }

  cart.totalPrice = totalPrice;
  cart.totalItems = cart.items.reduce((acc, curr) => acc + curr.qty, 0); //calc total items
  let newProduct = await cart.save(); //save cart
  newProduct = await Cart.find({ userid }).populate("items.productid");
  res.json({ status: 1, message: "added successfully", cart: newProduct });
};

const removeProductFromCart = async (req, res) => {
  const { userid, productid } = req.body;
  const cart = await Cart.findOne({ userid });

  if (cart) {
    cart.items = cart.items.filter((product) => product.productid != productid); //filter product in cart

    let totalPrice = 0;
    for (let item of cart.items) {
      const product = await Product.findById({ _id: item.productid });
      //console.log(product);
      if (product) {
        totalPrice = totalPrice + product.discountedPrice * item.qty; //calc total price
      }
    }

    cart.totalPrice = totalPrice;
    cart.totalItems = cart.items.reduce((acc, curr) => acc + curr.qty, 0);
    let updatedCart = await cart.save();

    updatedCart = await Cart.find({ userid }).populate("items.productid");
    // const product = req.body;
    // cart.push(product);
    res.json({ status: 1, message: "deleted successfully", cart: updatedCart });
  } else {
    res.json({ status: 1, message: "User Cart is empty" });
  }
};

const getCartItems = async (req, res) => {
  const { userid } = req.params;
  const items = await Cart.find({ userid }).populate("items.productid"); //get cart items
  res.json({ status: 1, message: "Success", cart: items });
};

const emptyCart = async (req, res) => {
  const { userid } = req.body;
  const cart = await Cart.find({ userid });
  if (cart) {
    const updatedCart = await Cart.findOneAndUpdate(
      { userid },
      { items: [], totalItems: 0, totalPrice: 0 },
      { new: true }
    ); //empty cart

    res.json({ message: "Cart Empty Successfully", cart: updatedCart });
  } else {
    res.status(404).json({ message: "Cart Not Found" });
  }
};

module.exports = {
  addProductToCart,
  removeProductFromCart,
  getCartItems,
  emptyCart,
};
