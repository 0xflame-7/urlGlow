const userService = require("../services/userService");

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
    const user = await userService.loginUser(req.body);
    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
};
