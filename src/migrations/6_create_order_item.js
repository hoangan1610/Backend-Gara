'use-strict'

const product = require("../models/product");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('order_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      order_id: {
        type: Sequelize.BIGINT,
        references: {
          model: 'orders',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      product_id: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      product_option_id: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      quantity: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false
      },
      note: {
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
    await queryInterface.dropTable('order_items');
  }
};