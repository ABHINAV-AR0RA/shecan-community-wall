const mongoose = require("mongoose");

/**
 * Message Schema
 *
 * Represents a single post on the She Can Foundation Community Wall.
 * Each message has an author name, email, body text, a like counter,
 * and a creation timestamp.
 */
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [100, "Name cannot exceed 100 characters"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        // RFC-5322–style lightweight regex for common email formats
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },

  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
    maxlength: [1000, "Message cannot exceed 1000 characters"],
  },

  likes: {
    type: Number,
    default: 0,
    min: [0, "Likes cannot be negative"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
