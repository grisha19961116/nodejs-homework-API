const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const contactsRouter = require("./routes/contacts");
const authenticationRoute = require("./routes/user");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

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

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", apiLimiter, contactsRouter);
app.use("/api/auth", apiLimiter, authenticationRoute);

app.use((req, res) => {
  console.log(`ddd`, req);
  res.status(404).json({ message: "Not found" });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
