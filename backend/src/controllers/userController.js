const userService = require("../services/userService");

// Cookie options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 60 * 60 * 1000, // 1 hour
};

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
    const { user, token } = await userService.loginUser(req.body);

    // set auth cookie
    res.cookie("authToken", token, cookieOptions);

    // omit hashPassword in response
    const { hashPassword, ...userData } = user.toObject();

    res.status(200).json({ isAuth: true, user: userData });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
};
