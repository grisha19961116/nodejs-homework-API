const mongoose = require("mongoose");

require("dotenv").config();

const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () =>
  console.log("mongoose Database was connect successful to db!")
);

mongoose.connection.on("error", () =>
  console.log("mongoose Database was not connect successful to db, error!")
);

mongoose.connection.on("disconnected", () =>
  console.log("mongoose Database was disconnected")
);

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Connection for db is closed");
  process.exit(1);
});

module.exports = db;
