module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "products",
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          unique: true,
        },
        title: Sequelize.STRING(255),
        author: Sequelize.STRING(255),
        description: Sequelize.TEXT,
        category_id : {
          type: Sequelize.UUID,
          references: {
            model: "category",
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
        price: Sequelize.FLOAT,
        stock: Sequelize.INTEGER,
        thumbnail_url: Sequelize.TEXT,
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
    return queryInterface.dropTable("products");
  },
};