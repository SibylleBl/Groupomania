const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    console.log("🚀 ~ file: multer-config.js ~ line 14 ~ file", file);
    console.log("🚀 ~ file: multer-config.js ~ line 14 ~ req", req);

    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];

    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage }).single("image");
