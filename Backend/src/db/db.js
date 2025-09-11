const mongoose = require("mongoose");

function connectDB() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGO_URL, {
        // Adding additional options for better stability
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of default 30
      })
      .then((connection) => {
        console.log("MongoDB connected successfully");
        resolve(connection);
      })
      .catch((err) => {
        console.error("MongoDB connection failed:", err);
        reject(err);
      });
  });
}

module.exports = connectDB;
