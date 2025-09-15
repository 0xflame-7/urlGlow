const baseCookieOptions = (isProduction) => ({
  httpOnly: true,
  secure: isProduction, // driven from config
  sameSite: "strict",
});

module.exports = (nodeEnv) => ({
  baseCookieOptions: baseCookieOptions(nodeEnv === "production"),
  REFRESH_COOKIE_NAME: "refreshToken",
  REFRESH_COOKIE_MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 days
});
