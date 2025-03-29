'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tasks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            status: {
                type: Sequelize.ENUM('pending', 'in_progress', 'awaiting_confirmation', 'completed'),
                allowNull: false,
                defaultValue: 'pending',
            },
            assigned_date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            deadline: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            completion_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            employee_id: {
                type: Sequelize.BIGINT,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'SET NULL',
            },
            admin_id: {
                type: Sequelize.BIGINT,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'SET NULL',
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tasks');
    },
};
