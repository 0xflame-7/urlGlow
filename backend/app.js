const express = require("express");
const morgan = require("morgan");
const logger = require("./src/config/logger");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./src/middleware/errorHandler");

// Create express app
const app = express();

// middleware For logging requests
app.use(
  morgan("dev", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// middleware for parsing json
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  logger.info("Incoming request to /");
  res.json({
    message: "Hello Daksh",
  });
});

app.use("/api/auth", require("./src/routes/userRoutes"));

app.use(errorHandler);

module.exports = app;
