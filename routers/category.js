const { Router } = require("express");

const router = Router();
const categoryController = require("../controllers/category-controllers");

router.post("/create", categoryController.create);
router.get("/read", categoryController.read);
router.get("/read/:id", categoryController.findById);
router.patch("/update", categoryController.update);
router.delete("/delete", categoryController.delete);

module.exports = router;
