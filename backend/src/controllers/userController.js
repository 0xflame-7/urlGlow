const cookieOptions = require("../config/cookie");
const userService = require("../services/userService");
const {
  setRefreshToken,
  clearRefreshToken,
  getRefreshTokenPayload,
  getRefreshToken,
} = require("../utils/cookieManager");

async function register(req, res, next) {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { user, accessToken, refreshToken } = await userService.loginUser(
      req.body
    );

    // set auth cookie
    setRefreshToken(res, refreshToken);

    // omit hashPassword in response
    const { hashedPassword, refreshToken: _, ...userData } = user.toObject();
    res.status(200).json({ isAuth: true, accessToken, user: userData });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    // remove refresh token from DB
    const payload = getRefreshTokenPayload(req);
    if (payload) await userService.logoutUser(payload.userId);

    clearRefreshToken(res);
    res.status(200).json({ isAuth: false, message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const payload = getRefreshTokenPayload(req);
    if (!payload)
      return res.status(401).json({ isAuth: false, message: "Invalid token" });

    const { accessToken } = await userService.refreshAccessToken(
      getRefreshToken(req)
    );

    res.json({ isAuth: true, accessToken });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  logout,
  refresh,
};
