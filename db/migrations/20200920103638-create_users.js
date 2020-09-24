module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "users",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          unique: true,
        },
        name: Sequelize.STRING(50),
        email: Sequelize.STRING(50),
        password: Sequelize.STRING(255),
        reset_token: Sequelize.STRING(255),
        is_confirmed: Sequelize.BOOLEAN,
        confirm_token: Sequelize.STRING(255),
        level : Sequelize.ENUM("USER", "ADMIN"),
        saldo : Sequelize.FLOAT,
        confirm_at: Sequelize.DATE,

        created_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW(),
        },
        updated_at: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW(),
        },
        deleted_at: {
          type: Sequelize.DATE,
        },
      },
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  },
};