const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  }
});

// File filter (optional but good)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|jpg|jpeg|png/;
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and image files allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter
});

module.exports = upload;
