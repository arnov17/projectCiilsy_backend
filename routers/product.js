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

router.post(
  "/create",
  upload.single("fileThumbnail"),
  productController.create
);

router.patch(
  "/update",
  upload.single("fileThumbnail"),
  productController.update
);

router.get("/read", productController.read);
router.get("/read/:id", productController.findById);
router.delete("/delete", productController.delete);

//with middleware
// router.post(
//   "/create",
//   upload.single("fileThumbnail"), authorize(level.Admin),
//   productController.create
// );

// router.patch(
//   "/update",
//   upload.single("fileThumbnail"), authorize(level.Admin),
//   productController.update
// );

// router.get("/read", authorize(), productController.read);
// router.get("/read/:id", authorize(), productController.findById);
// router.delete("/delete", authorize(), productController.delete);

module.exports = router;
