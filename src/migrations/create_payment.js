'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { BIGINT, STRING, DECIMAL, DATE, JSON } = Sequelize;
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: BIGINT
      },
      order_id: {
        type: BIGINT,
        allowNull: false
      },
      method: {
        type: STRING,
        allowNull: false
      },
      bank_code: {
        type: STRING,
        allowNull: true
      },
      status: {
        type: STRING,
        allowNull: false
      },
      amount: {
        type: DECIMAL(10, 2),
        allowNull: false
      },
      currency: {
        type: STRING,
        allowNull: false
      },
      description: {
        type: STRING,
        allowNull: true
      },
      transaction_id: {
        type: STRING,
        allowNull: true
      },
      transaction_info: {
        type: STRING,
        allowNull: true
      },
      transaction_status: {
        type: STRING,
        allowNull: true
      },
      transaction_time: {
        type: DATE,
        allowNull: true
      },
      transaction_data: {
        type: JSON,
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
    await queryInterface.dropTable('payments');
  }
};