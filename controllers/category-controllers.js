 
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UserModel, CategoryModel } = require("../db/models");

exports.create = async (req, res, next) => {
  try {
    // console.log(req.headers)
    const { authorization } = req.headers;
    const { category_name} = req.body;

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

    const category = await CategoryModel.create({
        category_name,
        user_id: user.id,
    });

    return res.status(200).json({
      message: "Success create category",
      data: category,
    });
  } catch (error) {
    //   console.log(error)
    return next(error);
  }
};

exports.read = async (req, res, next) => {
    try {
      const category = await CategoryModel.findAll();
      return res.status(200).json({
        message: "Success get category",
        data: category,
      });
    } catch (error) {
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
  
      const { id, category_name } = req.body;
  
      const existCategory = await CategoryModel.findOne({
        where : {
          id : id,
        }
      });
      if(!existCategory) {
        const error = new Error("category not found");
        error.statusCode = 404;
        throw error;
      }
  
      const updateCategory = await CategoryModel.update({
        category_name,
        user_id: user.id,
      },
      {
        where : {
          id : id
        }
      }
      );
  
      return res.status(200).json({
        message: "Success update category",
        data: updateCategory,
      });
    } catch (error) {
      return next(error)
    }
  }
  
  exports.delete = async (req, res, next) => {
      try {
        const { authorization } = req.headers;
        const { id } = req.param;
        console.log(req.param)
        console.log(id)
    
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

        await CategoryModel.destroy({
          where : {
            id : id
          }
        });
        return res.status(200).json({
          message: "Success delete category",
        });
      } catch (error) {
        console.log(error);
        return next(error);
      }
    };