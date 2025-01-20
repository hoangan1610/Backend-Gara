'use-strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      total_amount: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'VND'
      },
      discount: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      info: {
        type: Sequelize.JSON,
        allowNull: true
      },
      payment_method: {
        type: Sequelize.STRING,
        allowNull: true
      },
      payment_bank_code: {
        type: Sequelize.STRING,
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
    await queryInterface.sequelize.query(`ALTER TABLE orders AUTO_INCREMENT = 100`);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  }
};