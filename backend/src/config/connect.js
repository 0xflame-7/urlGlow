const mongoose = require("mongoose");
const MONGO_URL = require("./core").MONGO_URL;

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`);
  }
};

module.exports = connect;
