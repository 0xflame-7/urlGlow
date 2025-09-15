const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./src/middleware/errorHandler");
const logger = require("./src/utils/logger");
const NODE_ENV = require("./src/config/core").NODE_ENV;

// Create express app
const app = express();

// middleware For logging requests
if (NODE_ENV === "development") {
  app.use(
    morgan("dev", {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );
}

// middleware for parsing json
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", require("./src/routes/userRoutes"));

// error handler
app.use(errorHandler);

module.exports = app;
