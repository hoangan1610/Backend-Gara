'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { BIGINT, STRING, DECIMAL, DATE, JSON, ENUM } = Sequelize;
    await queryInterface.createTable('costs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: BIGINT
      },
      total_cost: {
        type: BIGINT,
        allowNull: false
      },
      cost_type: {
        type: ENUM('PURCHASE', 'SALARY', 'MAINTENANCE', 'OTHER'),
        allowNull: false
      },
      product_id: {
        type: BIGINT,
        references: {
          model: 'products',
          key: 'id'
        },
        allowNull: true
      },
      employee_id: {
        type: BIGINT,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: true
      },
      description: {
        type: STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('costs');
  }
};