const { Router } = require("express");

const router = Router();
const authController = require("../controllers/auth-controllers");

router.post("/register/user", authController.register);
router.post("/register/admin", authController.register);
// router.post("/login", authController.login);
router.post("/login/user", authController.login);
router.post("/login/admin", authController.login);
router.get("/read/:id", authController.findById);
router.patch("/update", authController.update);

module.exports = router;
