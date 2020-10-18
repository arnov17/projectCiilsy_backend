require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UserModel, TransactionModel, OrderModel } = require("../db/models");
const { ProductModel } = require("../db/models/product-model");

exports.create = async (req, res, next) => {
  try {
    const { transaction_id, product_id, total } = req.body;

    const { authorization } = req.headers;

    if (!authorization) {
      const error = new Error("Authorization required");
      error.statusCode = 401;
      throw error;
    }

    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decodedToken.sub;

    const user = await UserModel.findOne({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      const error = new Error("User with this token not found");
      error.statusCode = 401;
      throw error;
    }

    const product = await ProductModel.findOne({
      where: {
        id: product_id,
      },
    });
    if (!product) {
      const error = new Error("Product with this id not found");
      error.statusCode = 404;
      throw error;
    }

    const transaction = await TransactionModel.findOne({
      where: {
        id: transaction_id,
      },
    });
    if (!transaction) {
      const error = new Error("Transaction with this id not found");
      error.statusCode = 404;
      throw error;
    }

    const order = await OrderModel.create({
      transaction_id,
      product_id,
      user_id: user.id,
      price: product.price,
      total,
      title: product.title,
      author: product.author,
      description: product.description,
    });

    return res.status(200).json({
      message: "Success order products",
      data: order,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
