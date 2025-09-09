const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`);
  }
};

module.exports = connect;
