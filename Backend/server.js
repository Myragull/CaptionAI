require("dotenv").config();
const app = require("./src/app");
const connectionDB = require("./src/db/db");

// Define port with fallback for flexibility
const PORT = process.env.PORT || 3000;

// Start server only after successful database connection
connectionDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    // Graceful shutdown handling
    process.on("SIGTERM", () => {
      console.log("SIGTERM signal received: closing HTTP server");
      server.close(() => {
        console.log("HTTP server closed");
      });
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database. Server not started:", err);
    process.exit(1); // Exit with error code
  });
