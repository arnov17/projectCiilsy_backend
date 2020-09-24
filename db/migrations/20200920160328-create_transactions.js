module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "transactions",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          unique: true,
        },
        amount: Sequelize.FLOAT,
        status: Sequelize.ENUM("SUCCESS", "PENDING", "FAILED"),
        user_id: {
          type: Sequelize.UUID,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },

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
    return queryInterface.dropTable("transactions");
  },
};