const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '../temp');

const upload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadMiddleware = multer({
  storage: upload,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

module.exports = uploadMiddleware;
