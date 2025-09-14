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
  hashPassword: {
    type: String,
    required: true,
    select: false,
    minlength: 6,
  },
  profilePic: {
    type: String,
    default: null,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
