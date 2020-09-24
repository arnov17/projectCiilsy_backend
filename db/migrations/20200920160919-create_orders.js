module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "orders",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          unique: true,
        },
        transaction_id: {
          type: Sequelize.UUID,
          references: {
            model: "transactions",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        user_id: {
          type: Sequelize.UUID,
          references: {
            model: "users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        product_id: {
          type: Sequelize.UUID,
          references: {
            model: "products",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        price: Sequelize.FLOAT,
        total: Sequelize.INTEGER,
        title: Sequelize.STRING(255),
        author: Sequelize.STRING(255),
        description: Sequelize.TEXT,

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
    return queryInterface.dropTable("orders");
  },
};