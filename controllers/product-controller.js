require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UserModel, ProductModel, categoryModel } = require("../db/models");
const { Op } = require("sequelize");

exports.create = async (req, res, next) => {
  try {
    const {
      title,
      author,
      description,
      category_id,
      price,
      stock,
      user_id,
    } = req.body;

    const upload_thumbnailurl = `/thumbnail/${req.file.filename}`;

    const product = await ProductModel.create({
      title,
      author,
      description,
      category_id,
      price,
      stock,
      thumbnail_url: upload_thumbnailurl,
      // thumbnail_url,
      user_id: user_id,
    });

    return res.status(200).json({
      message: "Success create product",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.read = async (req, res, next) => {
  try {
    const params = req.query;
    // console.log(params);

    //Pagination
    const limit = params.limit ? Number(params.limit) : 3;
    const offset = Number(limit) * ((Number(params.page || 1) || 1) - 1);

    const order =
      // show new id at first with desc
      params.sort_by && params.sort_type
        ? [[params.sort_by, params.sort_type]]
        : [["id", "DESC"]];

    const where = {};
    if (params.name) where.title = { [Op.like]: `%${params.title}%` };
    if (params.author) where.author = { [Op.like]: `%${params.author}%` };

    const products = await ProductModel.findAndCountAll({
      limit: limit || 3,
      offset,
      where,
      order,
      attribute: this.attribute,
    });
    products.limit = limit;
    products.offset = offset;
    products.page = offset / limit + 1;

    // const products = await ProductModel.findAll();

    return res.status(200).json({
      message: "Success get products",
      data: products,
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
    console.log(id);

    const findProduct = await ProductModel.findByPk(id);
    res.send(findProduct);
  } catch (error) {
    res.status(500).send({
      message: "Error when find product by id",
    });
    return next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const params = req.params;
    const id = params.id;
    console.log(id);
    const {
      title,
      author,
      description,
      category_id,
      price,
      stock,
      user_id,
      // thumbnail_url,
    } = req.body;
    console.log(req.body);

    if (req.body.fileThumbnail !== "null") {
      console.log(req.file);
      const upload_thumbnailurl = `/thumbnail/${req.file.filename}`;

      const existProduct = await ProductModel.findOne({
        where: {
          id: id,
        },
      });
      if (!existProduct) {
        const error = new Error("product not found");
        error.statusCode = 404;
        throw error;
      }

      const updateProduct = await ProductModel.update(
        {
          title,
          author,
          description,
          category_id,
          price,
          stock,
          thumbnail_url: upload_thumbnailurl,
          user_id: user_id,
        },
        {
          where: {
            id: id,
          },
        }
      );

      return res.status(200).json({
        message: "Success update product",
        data: updateProduct,
      });
    } else {
      // console.log(req.file);
      // const upload_thumbnailurl = `/thumbnail/${req.file.filename}`;

      const existProduct = await ProductModel.findOne({
        where: {
          id: id,
        },
      });
      if (!existProduct) {
        const error = new Error("product not found");
        error.statusCode = 404;
        throw error;
      }

      const updateProduct = await ProductModel.update(
        {
          title,
          author,
          description,
          category_id,
          price,
          stock,
          // thumbnail_url: upload_thumbnailurl,
          user_id: user_id,
        },
        {
          where: {
            id: id,
          },
        }
      );

      return res.status(200).json({
        message: "Success update product",
        data: updateProduct,
      });
    }
  } catch (error) {
    return next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.body;
    // console.log(id);

    await ProductModel.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      message: "Success delete product",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
