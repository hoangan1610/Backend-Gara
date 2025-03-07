'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { BIGINT, STRING, JSON, DATE } = Sequelize;
    await queryInterface.createTable('settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: BIGINT
      },
      key: { type: STRING, allowNull: false },
      value: { type: JSON, allowNull: false },
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
  }
};