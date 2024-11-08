const Review = require("../models/Review");
const Product = require("../models/Product");

const addReview = async (req, res) => {
  const { name, rating, userid, comment, productid } = req.body;
  const product = await Product.findById({ _id: productid }); //find product to review

  if (product) {
    //if exists then check whether already reviewed
    const alreadyReviewed = await Review.findOne({ userid, productid });
    if (alreadyReviewed) {
      //if already reviewed
      res.json({ message: "Product already reviewed" });
    } else {
      //if not then save review
      const newReview = new Review({
        name,
        rating,
        userid,
        comment,
        productid,
      });
      const reviewAdded = await newReview.save();
      product.review.push({ reviewId: reviewAdded._id });
      product.numReviews = product.review.length;
      let productReviews = await Review.find({ productid });

      product.rating =
        productReviews.length > 0 &&
        Math.floor(
          productReviews.reduce((acc, item) => item.rating + acc, 0) /
            productReviews.length
        );

      await product.save(); //save product review
      res.json({
        message: "Review Added Successfully",
        review: reviewAdded,
        product,
      });
    }
  } else {
    res.json({ message: "No product found" });
  }
};

const getReview = async (req, res) => {
  const { productid, userid } = req.params;
  const review = await Review.findOne({ productid, userid }); //get review
  if (review) {
    res.json({ message: "Product reviewed", review });
  } else {
    res.json({ message: "Not Reviewed", review: null });
  }
};

module.exports = { addReview, getReview };
