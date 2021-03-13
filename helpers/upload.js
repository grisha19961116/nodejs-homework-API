const multer = require("multer");
const path = require("path");
require("dotenv").config();
const DIR_UPLOAD = path.join(process.cwd(), process.env.DIR_UPLOAD);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR_UPLOAD);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }
    cb(null, false);
  },
});

module.exports = upload;
