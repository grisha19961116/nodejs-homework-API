const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const contactsRouter = require("./routes/api/contacts");
const authenticationRoute = require("./routes/api/user");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authenticationRoute);

app.use((req, res) => {
  console.log(`ddd`, req);
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
