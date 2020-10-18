const sequelize = require("../../config/sequelize");
const Sequelize = require("sequelize");

class TransactionModel extends Sequelize.Model {}

TransactionModel.init(
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    amount: Sequelize.FLOAT,
    status: Sequelize.ENUM("SUCCESS", "PENDING", "FAILED"),
    user_id: Sequelize.UUID,
  },
  {
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    sequelize: sequelize,
    modelName: "transactions",
    tableName: "transactions",
  }
);

module.exports = {
  TransactionModel,
};
