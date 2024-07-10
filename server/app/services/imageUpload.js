const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/upload/"),
  filename: (_, file, cb) => {
    const fileType = ["image/png", "image/jpeg", "image/jpg"];
    if (fileType.includes(file.mimetype))
      cb(null, `${Date.now()}-${file.originalname}`);
    else cb(new Error("invalid file type"));
  },
});

module.exports = multer({ storage });
