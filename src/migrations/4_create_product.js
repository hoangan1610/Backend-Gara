'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      path: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      detail: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      stock: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      },
      image_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Xóa bảng 'Products' nếu rollback
    await queryInterface.dropTable('products');
  }
};
