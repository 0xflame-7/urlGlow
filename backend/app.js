const express = require("express");
const morgan = require("morgan");
const logger = require("./src/config/logger");
const connect = require("./src/config/connect");

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

app.get("/", (req, res) => {
  logger.info("Incoming request to /");
  res.json({
    message: "Hello Daksh",
  });
});

app.use("/api/auth", require("./src/routes/userRoutes"));

app.listen(process.env.PORT, "0.0.0.0", async () => {
  await connect();
  logger.info(`Server running on port ${process.env.PORT}`);
});
