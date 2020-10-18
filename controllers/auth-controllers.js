require("dotenv").config();
const bcrypt = require("bcryptjs");
const { UserModel } = require("../db/models");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    console.log(req.url);
    console.log(req.body);
    const { name, email, password } = req.body;

    const existUser = await UserModel.findOne({
      where: {
        email,
      },
    });
    if (existUser) {
      const error = new Error("User with this email already exist");
      error.statusCode = 400;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    let level = "USER";
    if (req.url === "/register/admin") level = "ADMIN";

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      level,
      saldo: 0,
    });

    return res.status(200).json({
      message: "Success register new user",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    let level = "USER";
    if (req.url === "/login/admin") level = "ADMIN";

    const existUser = await UserModel.findOne({
      where: {
        email,
        level,
      },
    });

    if (!existUser) {
      const error = new Error("The Email not found");
      error.statusCode = 500;
      throw error;
    }

    const isSamePassword = await bcrypt.compare(password, existUser.password);
    if (!isSamePassword) {
      const error = new Error("Password incorrect");
      error.statusCode = 500;
      throw error;
    }

    const payload = {
      sub: existUser.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    return res.status(200).json({
      message: "login user Succes",
      data: {
        name: existUser.name,
        id: existUser.id,
        access_token: token,
        type: "Bearer",
      },
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.findById = async (req, res) => {
  try {
    const params = req.params;
    const id = params.id;

    const findUser = await UserModel.findByPk(id);
    res.send(findUser);
  } catch (error) {
    res.status(500).send({
      message: "Error when find category by id",
    });
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
    // console.log(decodedToken)
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

    const { idUser, saldo } = req.body;
    // console.log(req.body);

    const existProduct = await UserModel.findOne({
      where: {
        id: idUser,
      },
    });
    if (!existProduct) {
      const error = new Error("user not found");
      error.statusCode = 404;
      throw error;
    }

    const updateUser = await UserModel.update(
      {
        saldo,
      },
      {
        where: {
          id: idUser,
        },
      }
    );

    return res.status(200).json({
      message: "Success update user",
      data: {
        name: updateUser.name,
        id: updateUser.id,
        saldo: updateUser.saldo,
        access_token: token,
        type: "Bearer",
      },
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
