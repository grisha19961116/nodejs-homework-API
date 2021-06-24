const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const apiLimiter = require("./helpers/apiLimiter");

const contactsRouter = require("./routes/contacts");
const authenticationRoute = require("./routes/user");
const app = express();

const FOLDER_IMAGES = process.env.DIR_IMAGES;

app.use(express.static(path.join(__dirname, FOLDER_IMAGES)));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", apiLimiter, contactsRouter);
app.use("/api/auth", apiLimiter, authenticationRoute);

app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
