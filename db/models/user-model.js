const sequelize = require("../../config/sequelize");
const Sequelize = require("sequelize");

class UserModel extends Sequelize.Model {}

UserModel.init(
  {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      name: Sequelize.STRING(50),
      email: Sequelize.STRING(50),
      password: Sequelize.STRING(255),
      reset_token: Sequelize.STRING(255),
      is_confirmed: Sequelize.BOOLEAN,
      level : Sequelize.ENUM("USER", "ADMIN"),
      saldo : Sequelize.FLOAT,
      confirm_token: Sequelize.STRING(255),
      confirm_at: Sequelize.DATE,
  },
  {
    underscored: true,
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    sequelize: sequelize,
    modelName: "users",
    tableName: "users",
  }
);

module.exports = {
  UserModel,
};