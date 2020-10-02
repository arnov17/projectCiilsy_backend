require("dotenv").config();
const jwt = require("jsonwebtoken");
const { TransactionModel, UserModel, OrderModel } = require("../db/models");

exports.create = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { amount } = req.body;
    console.log(amount);

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

    const transaction = await TransactionModel.create({
      amount,
      status: "PENDING",
      user_id: user.id,
    });
    console.log(transaction);

    return res.status(200).json({
      message: "Success create transaction",
      data: transaction,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
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

    const { status, transaction_id } = req.body;

    const existTransaction = await TransactionModel.findOne({
      where: {
        id: transaction_id,
      },
      include: [
        {
          model: OrderModel,
          as: "orders",
        },
      ],
    });
    if (!existTransaction) {
      const error = new Error("Transaction not found");
      error.statusCode = 404;
      throw error;
    }

    let amount = 0;
    existTransaction.orders.map((order) => {
      amount += order.price * order.total;
    });

    await TransactionModel.update(
      {
        amount,
        status: status ? status : existTransaction.status,
      },
      {
        where: {
          id: transaction_id,
        },
      }
    );

    return res.status(200).json({
      message: "Success update transaction",
      data: existTransaction,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
