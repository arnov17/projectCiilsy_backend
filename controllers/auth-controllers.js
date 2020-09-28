require("dotenv").config();
const bcrypt = require('bcryptjs');
const {UserModel} = require('../db/models');
const jwt = require("jsonwebtoken");


exports.register = async (req, res, next) => {
    try {
      // console.log(req.url)
        const {name, email, password} = req.body

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
          
        let level = 'USER'
        if (req.url === '/register/admin') level = 'ADMIN'

        const user = await UserModel.create({
            name,
            email,
            password : hashedPassword,
            level,
            saldo : 0
        })

        return res.status(200).json({
            message: "Success register new user",
            data: user,
          }); 

    } catch (error) {
        return next(error);
    };
}

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existUser = await UserModel.findOne({
      where: {
        email,
      },
    });
    if (!existUser) {
      const error = new Error("The Email not found");
      error.statusCode = 404;
      throw error;
    }

    const isSamePassword = await bcrypt.compare(password, existUser.password);
    if (!isSamePassword) {
      const error = new Error("Password incorrect");
      error.statusCode = 401;
      throw error;
    }

    const payload = {
      sub: existUser.id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    return res.status(200).json({
      message: "login user Succes",
      data: {
        access_token: token,
        type: "Bearer",
      },
    });
  } catch (error) {}
};