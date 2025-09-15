const {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} = require("../middleware/errorHandler");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/tokenManager");
const {
  hashPasswordForUser,
  comparePasswordWithHash,
} = require("../utils/helper");
const {
  getUserByEmail,
  createUser,
  updateRefreshToken,
  clearRefreshToken,
  getRefreshTokenById,
} = require("../repository/userRepository");

async function registerUser({ name, email, password }) {
  if (!name || !email || !password) {
    throw new BadRequestError("All fields are required");
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new ConflictError("Email already exists");
  }

  const hashedPassword = await hashPasswordForUser(password);
  const user = await createUser({ name, email, hashedPassword });

  return user;
}

async function loginUser({ email, password }) {
  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }

  const user = await getUserByEmail(email);
  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const isMatch = await comparePasswordWithHash(password, user.hashedPassword);
  if (!isMatch) throw new UnauthorizedError("Invalid credentials");

  // create tokens
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // save refresh token in DB
  await updateRefreshToken(user._id, refreshToken);

  return { user, accessToken, refreshToken };
}

async function refreshAccessToken(refreshToken) {
  if (!refreshToken) throw new UnauthorizedError("No refresh token provided");

  const payload = verifyRefreshToken(refreshToken);
  const user = await getRefreshTokenById(payload.userId);

  if (!user || user.refreshToken !== refreshToken) {
    throw new UnauthorizedError("Invalid refresh token");
  }

  const newAccessToken = generateAccessToken(user._id);
  return { accessToken: newAccessToken };
}

async function logoutUser(userId) {
  if (!userId) throw new UnauthorizedError("Not authenticated");

  await clearRefreshToken(userId);
  return { isAuth: false, message: "Logged out successfully" };
}

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
};
