const logger = require("./src/config/logger");
const connect = require("./src/config/connect");
const app = require("./app");

async function startServer() {
  try {
    await connect();
    const server = app.listen(5000, "0.0.0.0", () => {
      // logger.info(`Server started on port ${PORT}`);
    });

    process.on("SIGINT", () => shutdown(server));
    process.on("SIGTERM", () => shutdown(server));
  } catch (err) {
    logger.error(`Failed to start server ${err}`);
    process.exit(1);
  }
}

async function shutdown(server) {
  logger.info("Shutting down gracefully...");
  server.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
}

startServer();
