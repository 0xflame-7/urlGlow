// require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV || "development";
const cookieConfig = require("./cookie")(NODE_ENV);

module.exports = {
  NODE_ENV,
  PORT: Number(process.env.PORT || 5000),
  MONGO_URL: process.env.MONGO_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  SERVER_URL: process.env.SERVER_URL || "http://localhost:5000",

  ACCESS_TOKEN_EXPIRES_IN: "15m",
  REFRESH_TOKEN_EXPIRES_IN: "7d",

  ...cookieConfig,
};
