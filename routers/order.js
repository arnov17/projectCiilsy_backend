const { Router } = require("express");

const router = Router();
const orderController = require("../controllers/order-controllers");

router.post("/create", orderController.create);

module.exports = router;