const {
  REFRESH_COOKIE_NAME,
  baseCookieOptions,
  REFRESH_COOKIE_MAX_AGE,
} = require("../config/cookie");
const { verifyRefreshToken } = require("./tokenManager");

const setRefreshToken = (res, token) => {
  res.cookie(REFRESH_COOKIE_NAME, token, {
    ...baseCookieOptions,
    maxAge: REFRESH_COOKIE_MAX_AGE,
  });
};

const clearRefreshToken = (res) => {
  res.clearCookie(REFRESH_COOKIE_NAME, baseCookieOptions);
};

const getRefreshToken = (req) => req.cookies[REFRESH_COOKIE_NAME];

const getRefreshTokenPayload = (req) => {
  const token = getRefreshToken(req);
  return token ? verifyRefreshToken(token) : null;
};

module.exports = {
  setRefreshToken,
  clearRefreshToken,
  getRefreshTokenPayload,
  getRefreshToken,
};
