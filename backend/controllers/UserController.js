const Users = require("../models/User.js");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const SECRET_KEY = process.env.SECRET_KEY;

const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await Users.findOne({ email }); //find user with email

  if (!user || !user.password) {
    //if user does not exist
    res.json({ message: "Invalid credentials" });
  } else {
    //if exists then compare password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        //if password does not match
        res.json({ message: "Username or password is incorrect" });
      } else {
        //if match then update isLoggedin=true and create jwt token and send it in response
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
              address: user.address,
              mobile: user.mobile,
            },
          });
        });
      }
    });
  }
};

const updateUser = async (user) => {
  let updateduser = await Users.updateOne(
    { email: user.email },
    {
      isLoggedIn: true,
      lastLoggedIn: Date.now(),
    },
    { new: true }
  );
  return updateduser;
};

const signup = async (req, res) => {
  const { name, password, email, mobile, address } = req.body;
  let user = await Users.findOne({ email }); //find user with email
  if (user) {
    //if user already exist
    res.json({ message: "User already exists!" });
  } else {
    //if not, create new user and save
    user = new Users({ name, email, password, mobile, address });

    bcrypt.hash(user.password, 10, (err, hash) => {
      //encrypt password
      if (err) {
        res.json({ message: "Some error occurred in hash." + err });
      } else {
        user.password = hash;
        user.save().then((u) => {
          res.json({
            message: "Signup Successfull",
            user: u,
            success: true,
          });
        });
      }
    });
  }
};

const logout = async (req, res) => {
  const { userid } = req.body;

  let user = await Users.findById({ _id: userid });
  let updateduser = await Users.updateOne(
    //update user to isLoggedIn=false
    { email: user.email },
    { isLoggedIn: false },
    { new: true }
  );
  res.json({ message: "Logout successfully" });
};

const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Make sure this matches the clientId used in the frontend
    });
    const payload = ticket.getPayload();

    const { email, sub, name } = payload;

    let user = await Users.findOne({ email });

    // If user doesn't exist, create a new one
    if (!user) {
      user = new Users({
        googleId: sub,
        email,
        name,
        mobile: "",
      });
      await user.save();
    }

    // Generate JWT
    const pylod = {
      name: user.name,
      email: user.email,
    };
    updateUser(user).then((updateduser) => {
      const token = jwt.sign(pylod, SECRET_KEY, {
        expiresIn: "2h",
      });
      res.json({
        message: "Loggedin successfully",
        token: "Bearer " + token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          mobile: user.mobile,
        },
      });
    });
  } catch (error) {
    console.log("Token verification failed");
  }
};

const updateProfile = async (req, res) => {
  const { id, name, password, email, mobile, address } = req.body;
  let user = await Users.findById({ _id: id }); //get user
  if (user) {
    //if exists then update user and save
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.mobile = req.body.mobile || user.mobile;
    user.address = req.body.address || user.address;
    if (req.body.password) {
      let hashpwd = await bcrypt.hash(req.body.password, 10);
      user.password = hashpwd;
    }
    user.save().then((u) => {
      res.json({
        message: "User updated successfully",
        user: {
          id: u._id,
          name: u.name,
          email: u.email,
          address: u.address,
          mobile: u.mobile,
        },
        success: true,
      });
    });
  } else {
    res.json({ message: "Invalid credentials" });
  }
};

module.exports = { signup, login, googleLogin, logout, updateProfile };
