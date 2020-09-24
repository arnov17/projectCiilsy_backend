const sequelize = require("../../config/sequelize");
const Sequelize = require("sequelize");
const { Model } = require("sequelize");

class OrderModel extends Model {}

OrderModel.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    transaction_id: Sequelize.UUID,
    user_id: Sequelize.UUID,
    product_id: Sequelize.UUID,
    price: Sequelize.FLOAT,
    total: Sequelize.INTEGER,
    title: Sequelize.STRING(255),
    author: Sequelize.STRING(255),
    description: Sequelize.TEXT,
  },
  {
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    sequelize: sequelize,
    modelName: "orders",
    tableName: "orders",
  }
);

module.exports = {
  OrderModel,
};