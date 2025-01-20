'use-strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('cart_items', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            cart_id: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'carts',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                allowNull: false
            },
            product_id: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'products',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            product_option_id: {
                type: Sequelize.BIGINT,
                allowNull: true
            },
            quantity: {
                type: Sequelize.BIGINT,
                allowNull: false
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
        await queryInterface.dropTable('cart_items');
    }
};