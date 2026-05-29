/**
 * Global error-handling middleware.
 *
 * Catches any error forwarded via next(error) and returns a consistent
 * JSON error response.  The stack trace is only included in development
 * mode to aid debugging without leaking internals in production.
 */
const errorHandler = (err, _req, res, _next) => {
  // If the response status is still 200, upgrade it to 500
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

module.exports = errorHandler;
