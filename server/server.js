// ─── Load environment variables first ────────────────────────────────────────
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");
const errorHandler = require("./middleware/errorHandler");

// ─── Initialise Express app ──────────────────────────────────────────────────
const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────

// Enable CORS – allow the Vite dev server by default; extend the list for
// staging / production origins as needed.
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  })
);

// Parse incoming JSON bodies
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────────────────────

// Health-check endpoint (useful for monitoring / load-balancer probes)
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// Community Wall messages
app.use("/api/messages", messageRoutes);

// ─── Error handling (must be registered AFTER routes) ────────────────────────
app.use(errorHandler);

// ─── Start server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});

// ─── Graceful shutdown on unhandled promise rejections ───────────────────────
process.on("unhandledRejection", (reason) => {
  console.error("⚠️  Unhandled Rejection:", reason);
  // Let the process manager (PM2, Docker, etc.) restart the service
  process.exit(1);
});
