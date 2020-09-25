
const { Router } = require("express");

const router = Router();
const productController = require("../controllers/product-controller");

const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const storage = multer.diskStorage({
    destination: path.join(__dirname, "..", "thumbnail"),
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)  

        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
})
const upload = multer({storage: storage});

router.post("/create", upload.single('fileThumbnail'), productController.create);

router.post("/create", productController.create);
router.get("/read", productController.read);
router.patch("/update", productController.update);
router.delete("/delete", productController.delete);

module.exports = router;