const express = require("express");
const router = express.Router();

const {
  createMessage,
  getMessages,
  likeMessage,
} = require("../controllers/messageController");

/**
 * Community Wall message routes
 *
 * POST   /           → Create a new message
 * GET    /           → Retrieve all messages (newest first)
 * PATCH  /:id/like   → Increment a message's like count
 */
router.post("/", createMessage);
router.get("/", getMessages);
router.patch("/:id/like", likeMessage);

module.exports = router;
