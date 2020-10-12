const { Router } = require("express");

const router = Router();
const productController = require("../controllers/product-controller");
const authorize = require("../middleware/auth");
const level = require("../config/level");

const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "thumbnail"),
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);

      cb(null, raw.toString("hex") + path.extname(file.originalname));
    });
  },
});
const upload = multer({ storage: storage });

//with middleware
router.post(
  "/create",
  upload.single("fileThumbnail"),
  authorize(level.Admin),
  productController.create
);

router.patch(
  "/update",
  upload.single("fileThumbnail"),
  authorize(level.Admin),
  productController.update
);
router.delete("/delete", authorize(level.Admin), productController.delete);
router.get("/read", productController.read);
router.get("/read/:id", productController.findById);

module.exports = router;
