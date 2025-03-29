'use-strict'

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('product_options', {
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
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            price: {
                type: Sequelize.DECIMAL,
                allowNull: false
            },
            stock: {
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
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('product_options');
    }
}