const User = require("../models/User");

const getUserByEmail = async (email) => {
  return await User.findOne({ email }).select("+hashedPassword");
};

const getUserById = async (id) => {
  return await User.findById(id).select("+hashedPassword");
};

const getRefreshTokenById = async (id) => {
  return await User.findById(id).select("+refreshToken");
};

const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

const updateRefreshToken = async (id, refreshToken) => {
  return await User.findByIdAndUpdate(
    id,
    { refreshToken },
    { new: true, select: "+refreshToken" }
  );
};

const clearRefreshToken = async (id) => {
  return await User.findByIdAndUpdate(
    id,
    { refreshToken: null },
    { new: true }
  );
};

const updateProfilePic = async (id, profilePic) => {
  return await User.findByIdAndUpdate(id, { profilePic }, { new: true });
};

const updateName = async (id, name) => {
  return await User.findByIdAndUpdate(id, { name }, { new: true });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getUserByEmail,
  getUserById,
  getRefreshTokenById,
  createUser,
  updateRefreshToken,
  clearRefreshToken,
  updateProfilePic,
  updateName,
  deleteUser,
};
