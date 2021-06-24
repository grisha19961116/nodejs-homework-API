const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  handler: (req, res, next) => {
    return res.status(400).json({
      status: "error",
      code: 400,
      data: "Bad request",
      message: "Too many requests, please try again later.",
    });
  },
});

module.exports = apiLimiter;
