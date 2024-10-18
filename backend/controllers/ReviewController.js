const Review = require("../models/Review");
const Product = require("../models/Product");

const addReview = async (req, res) => {
  console.log(req.body);
  const { name, rating, userid, comment, productid } = req.body;
  const product = await Product.findById({ _id: productid });
  // const reviews = await Review.find({ productid, userid });
  //.populate(
  //     "review.reviewID"
  //   );

  if (product) {
    const alreadyReviewed = await Review.findOne({ userid, productid });
    console.log("alreadyReviewed" + alreadyReviewed);
    if (alreadyReviewed) {
      res.json({ message: "Product already reviewed" });
    } else {
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
      console.log("productReviews:" + productReviews);
      product.rating =
        productReviews.length > 0 &&
        Math.floor(
          productReviews.reduce((acc, item) => item.rating + acc, 0) /
            productReviews.length
        );

      await product.save();
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

module.exports = { addReview };
