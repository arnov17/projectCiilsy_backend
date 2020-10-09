require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../db/models");

const authorize = (levels = []) => {
  try {
    console.log("line 7" + levels);
    if (typeof levels === "string") {
      levels = [levels];
    }
    return [
      async (req, res, next) => {
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
          req.body.user_id = user.id;
          next();
        } catch (error) {
          return res.status(401).send({
            mesaage: "unauthorized",
          });
        }
      },
    ];
  } catch (error) {
    console.log(error);
  }
};

module.exports = authorize;
