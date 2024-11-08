const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.SECRET_KEY); //verify token
    console.log(decoded);
    if (decoded) {
      let email = decoded.email;
      console.log(email);
      let user = await User.findOne({ email });
      if (user) {
        next();
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(401).json({ message: "unauthorized" });
    }
  } catch (error) {
    res.json({ error });
  }
};

module.exports = protectRoute;
