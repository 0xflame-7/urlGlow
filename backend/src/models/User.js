const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    select: false,
  },
  profilePic: {
    type: String,
    default: null,
  },
  // store refresh token
  refreshToken: {
    type: String,
    select: false,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
