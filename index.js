require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 6003;

const authRouter = require("./routers/auth");
const productRouter = require("./routers/product");
const transactionRouter = require("./routers/transaction");
const orderRouter = require("./routers/order");
const categoryRouter = require("./routers/category");

app.use(express.json());
app.use("/thumbnail", express.static(__dirname + "/thumbnail/"));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/category", categoryRouter);

// error handling
// app.use((error, req, res, next) => {
//   const status = error.statusCode || 500;
//   return res.status(status).json({
//     message: status !== 500 ? error.message : "Internal server error",
//   });
// });

app.listen(PORT, () => {
  console.log(`Success running server on port ${PORT}`);
});
