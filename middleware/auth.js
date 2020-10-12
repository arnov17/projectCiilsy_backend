require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../db/models");

const authorize = (levels = []) => {
  try {
    // allow for a string or array
    if (typeof levels === "string") {
      levels = [levels];
    }
    return [
      async (req, res, next) => {
        try {
          const { authorization } = req.headers;
          const token = authorization.split(" ")[1];
          // const token = req.header("authorization").replace("Bearer ", "");
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const user = await UserModel.findOne({
            where: {
              id: decoded.sub,
            },
          });
          // console.log(user);
          if (levels.length && !levels.includes(user.level)) {
            return res.status(401).send({
              message: "Unauthorized",
            });
          }
          req.body.user_id = user.id;
          console.log(req.body);
          next();
        } catch (error) {
          return res.status(401).send({
            message: "Unauthorized",
          });
        }
      },
    ];
  } catch (error) {
    console.log(error);
  }
};

module.exports = authorize;
