const mongoose = require("mongoose");

/**
 * Connect to MongoDB.
 *
 * Uses the MONGO_URI environment variable (supports both MongoDB Atlas and
 * local MongoDB instances). Falls back to a local default if the env var
 * is missing.
 *
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    // Prefer the env var; fall back to a local MongoDB instance
    const uri =
      process.env.MONGO_URI || "mongodb://localhost:27017/shecan";

    const conn = await mongoose.connect(uri);

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    // Exit with failure so the process manager can restart the service
    process.exit(1);
  }
};

module.exports = connectDB;
