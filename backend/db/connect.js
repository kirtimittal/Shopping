const mongoose = require("mongoose");

const connectDB = async () => {
  return await mongoose.connect(
    `mongodb+srv://${process.env.atlasUser}:${process.env.atlasPassword}@cluster0.ksbjwec.mongodb.net/ShopPlusPlus?retryWrites=true&w=majority&appName=Cluster0`
  );
};

module.exports = connectDB;
