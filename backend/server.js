const connect = require("./src/config/connect");
const app = require("./app");
const logger = require("./src/utils/logger");
const PORT = require("./src/config/core").PORT;

async function startServer() {
  try {
    await connect();
    const server = app.listen(PORT, "0.0.0.0", () => {
      logger.info(`Server started on port ${PORT}`);
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
