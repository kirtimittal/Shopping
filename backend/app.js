const express = require("express");
const routes = require("./routes/index.js");
const cart = require("./routes/cart/index.js");
const user = require("./routes/user/index.js");
const wishlist = require("./routes/wishlist/index.js");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect.js");
const category = require("./routes/category/index.js");
const orders = require("./routes/order/index.js");

const corsOptions = {
  origin: "*",
};
app.use(express.json());
app.use(cors(corsOptions));
app.use("/", routes);
app.use("/api/cart", cart);
app.use("/api/user", user);
app.use("/api/wishlist", wishlist);
app.use("/api/category", category);
app.use("/api/orders", orders);

connectDB().then(
  app.listen(process.env.PORT, () =>
    console.log(`Connected to server on Port ${process.env.PORT}`)
  )
);
