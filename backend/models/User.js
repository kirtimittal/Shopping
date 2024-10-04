const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  mobile: {
    type: String,
  },
  googleId: {
    type: String, // Google ID will be stored for Google-authenticated users
  },
  address: [
    {
      type: String,
    },
  ],
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  lastLoggedIn: {
    type: Date,
    default: Date.now(),
  },
});

const Users = model("Users", UserSchema);

module.exports = Users;
