const { Router } = require("express");

const router = Router();
const transactionController = require("../controllers/transaction-controllers");

router.post("/create", transactionController.create);
router.patch("/update", transactionController.update);

module.exports = router;