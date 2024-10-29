const Users = require("../models/User.js");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const SECRET_KEY = process.env.SECRET_KEY;

const login = async (req, res) => {
  const { email, password } = req.body;
  //console.log(email, password);
  let user = await Users.findOne({ email });
  //console.log(user);
  if (!user || !user.password) {
    res.json({ message: "Invalid credentials" });
  } else {
    bcrypt.compare(password, user.password).then((isMatch) => {
      console.log(isMatch);
      console.log(password + " " + user.password);
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
              address: user.address,
            },
          });
        });
        console.log(user);
      }
    });
  }
};

const updateUser = async (user) => {
  let updateduser = await Users.updateOne(
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

const logout = async (req, res) => {
  console.log("logout");
  const { userid } = req.body;
  console.log(userid);
  let user = await Users.findById({ _id: userid });
  let updateduser = await Users.updateOne(
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
    console.log(payload);
    const { email, sub, name } = payload;

    let user = await Users.findOne({ email });

    // If user doesn't exist, create a new one
    if (!user) {
      user = new Users({
        googleId: sub,
        email,
        name,
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
        },
      });
    });
    // const jwtToken = generateJWT(user);
    // res.json({ token: jwtToken, user });
    //   return payload; // Contains user info
  } catch (error) {
    console.log("Token verification failed");
  }
};

const updateProfile = async (req, res) => {
  const { id, name, password, email, mobile, address } = req.body;
  let user = await Users.findById({ _id: id });
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.mobile = req.body.mobile || user.mobile;
    user.address = req.body.address || user.address;
    if (req.body.password) {
      //user.password = req.body.password;
      let hashpwd = await bcrypt.hash(req.body.password, 10);
      console.log(hashpwd);
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
        },
        success: true,
      });
    });
  } else {
    res.json({ message: "Invalid credentials" });
  }
};

module.exports = { signup, login, googleLogin, logout, updateProfile };
