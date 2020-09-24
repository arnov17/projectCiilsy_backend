
const { Router } = require("express");

const router = Router();
const productController = require("../controllers/product-controller");

const multer = require('multer');
const upload = multer({dest: "thumbnail/"})

router.post("/create", upload.single('fileThumbnail'), productController.create);

router.post("/create", productController.create);
router.get("/read", productController.read);
router.patch("/update", productController.update);
router.delete("/delete", productController.delete);

module.exports = router;