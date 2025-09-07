'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Tạo bảng 'Categories' với các trường giống với model Category
        await queryInterface.createTable('categories', {
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
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            path: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
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
        // Xóa bảng 'Categories' nếu rollback
        await queryInterface.dropTable('categories');
    }
};
