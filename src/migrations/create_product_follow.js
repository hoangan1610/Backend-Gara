'use-strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('product_follows', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                autoIncrement: true
            },
            product_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'products',
                    key: 'id'
                }
            },
            user_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
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
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('product_follows');
    }
}