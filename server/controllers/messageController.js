const Message = require("../models/Message");

// ─── CREATE ──────────────────────────────────────────────────────────────────

/**
 * @desc    Create a new community-wall message
 * @route   POST /api/messages
 * @access  Public
 */
const createMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // --- Manual presence check (Mongoose will also validate) ---
    if (!name || !email || !message) {
      res.status(400);
      throw new Error("Please provide name, email, and message");
    }

    const newMessage = await Message.create({ name, email, message });

    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

// ─── READ ────────────────────────────────────────────────────────────────────

/**
 * @desc    Get all community-wall messages (newest first)
 * @route   GET /api/messages
 * @access  Public
 */
const getMessages = async (_req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// ─── LIKE ────────────────────────────────────────────────────────────────────

/**
 * @desc    Increment the like count of a message by 1
 * @route   PATCH /api/messages/:id/like
 * @access  Public
 */
const likeMessage = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },   // Atomic increment — safe under concurrency
      { new: true, runValidators: true }
    );

    if (!message) {
      res.status(404);
      throw new Error("Message not found");
    }

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createMessage, getMessages, likeMessage };
