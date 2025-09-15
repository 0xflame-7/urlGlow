const baseCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV == "production",
  sameSite: "strict",
};

module.exports = {
  baseCookieOptions,
  REFRESH_COOKIE_NAME: "refreshToken",
  REFRESH_COOKIE_MAX_AGE: 7 * 24 * 60 * 60 * 1000,
};
