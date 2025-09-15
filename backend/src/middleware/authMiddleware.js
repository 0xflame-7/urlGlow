const { UnauthorizedError } = require("../middleware/errorHandler");
const { verifyAccessToken } = require("../utils/tokenManager");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("No token provided");
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyAccessToken(token);

  if (!payload) {
    throw new UnauthorizedError("Invalid or expired token");
  }

  req.userId = payload.userId; // attach user info
  next();
}

module.exports = authMiddleware;
