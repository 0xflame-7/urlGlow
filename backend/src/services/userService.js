const bcrypt = require("bcrypt");
const User = require("../models/User");
const {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} = require("../middleware/errorHandler");

async function registerUser({ name, email, password }) {
  if (!name || !email || !password) {
    throw new BadRequestError("All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ConflictError("Email already exists");
  }

  const saltRounds = 10;
  const hashPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({ name, email, hashPassword });
  await user.save();

  return user;
}

async function getUserByEmail(email) {
  return await User.findOne({ email }).select("+hashPassword");
}

async function loginUser({ email, password }) {
  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }

  const user = await getUserByEmail(email);
  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.hashPassword);
  if (!isMatch) {
    throw new UnauthorizedError("Invalid email or password");
  }

  // 🚨 In real apps, generate JWT or session here
  return user;
}

module.exports = {
  registerUser,
  getUserByEmail,
  loginUser,
};
