const sequelize = require("../../config/sequelize");
const Sequelize = require("sequelize");

class CategoryModel extends Sequelize.Model {}

CategoryModel.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    category_name: Sequelize.STRING(255),
    user_id: Sequelize.UUID,
  },
  {
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    sequelize: sequelize,
    modelName: "category",
    tableName: "category",
  }
);

module.exports = {
    CategoryModel,
};