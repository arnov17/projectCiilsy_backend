 
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UserModel, ProductModel } = require("../db/models");

exports.create = async (req, res, next) => {
  try {
    // console.log(req.headers)
    const { authorization } = req.headers;
    const { title, author, description, category_id, price, stock, thumbnail_url} = req.body;

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

    // upload response
    console.log(req.file);
    // console.log(req)
    // const upload_thumbnailurl = `/thumbnail/${req.file.filename}`
    
    const product = await ProductModel.create({
      title,
      author,
      description,
      category_id,
      price,
      stock,
      // thumbnail_url : upload_thumbnailurl,
      thumbnail_url ,
      user_id: user.id,
    });

    return res.status(200).json({
      message: "Success create product",
      data: product,
    });
  } catch (error) {
      console.log(error)
    return next(error);
  }
};

exports.read = async (req, res, next) => {
    try {
      const products = await ProductModel.findAll();
      return res.status(200).json({
        message: "Success get products",
        data: products,
      });
    } catch (error) {
      console.log(error)
      return next(error);
    }
  };

exports.findById = async (req, res) => {
    try {
      const params = req.params;
      const id = params.id;
  
      const findProduct = await ProductModel.findByPk(id);
      res.send(findProduct);
    } catch (error) {
      res.status(500).send({
        message: "Error when find product by id",
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

    const { id, title, author, description, category_id, price, stock, thumbnail_url} = req.body;

    const existProduct = await ProductModel.findOne({
      where : {
        id : id,
      }
    });
    if(!existProduct) {
      const error = new Error("product not found");
      error.statusCode = 404;
      throw error;
    }

    const updateProduct = await ProductModel.update({
      title,
      author,
      description,
      category_id,
      price,
      stock,
      thumbnail_url,
      user_id: user.id,
    },
    {
      where : {
        id : id
      },
    }
    );

    return res.status(200).json({
      message: "Success update product",
      data: updateProduct,
    });
  } catch (error) {
    return next(error)
  }
}

exports.delete = async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      const { id } = req.body;
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
      };
  
      await ProductModel.destroy({
        where : {
          id : id
        }
      });
      return res.status(200).json({
        message: "Success delete product",
      });
    } catch (error) {
      console.log(error)
      return next(error);
    }
  };