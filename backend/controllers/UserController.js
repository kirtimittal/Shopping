const Users = require("../models/User.js");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "MYSECRETKEY";

const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await Users.findOne({ email });

  if (!user) {
    res.json({ message: "No User found" });
  } else {
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        res.json({ message: "Username or password is incorrect" });
      } else {
        const payload = {
          name: user.name,
          email: user.email,
        };
        updateUser(user).then((updateduser) => {
          const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: "2h",
          });
          res.json({
            message: "Loggedin successfully",
            token: "Bearer " + token,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
            },
          });
        });
        console.log(user);
      }
    });
  }
};

const updateUser = async (user) => {
  let updateduser = await user.updateOne(
    { email: user.email },
    { isLoggedIn: true, lastLoggedIn: Date.now() },
    { new: true }
  );
  return updateduser;
};
const signup = async (req, res) => {
  const { name, password, email, mobile, address } = req.body;
  let user = await Users.findOne({ email });
  if (user) {
    res.json({ message: "User already exists!" });
  } else {
    user = new Users({ name, email, password, mobile, address });
    console.log(user);
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        res.json({ message: "Some error occurred in hash." + err });
      } else {
        user.password = hash;
        user.save().then((u) => {
          res.json({
            message: "User inserted successfully",
            user: u,
            success: true,
          });
        });
      }
    });
  }
  //const user = new Users({ name, email, password, mobile });
};

const logout = async (req, res) => {};

module.exports = { signup, login };
