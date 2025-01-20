'use strict';
const {
    Model
} = require('sequelize');
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            hashed_password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.STRING
            }, birth: {
                type: Sequelize.DATE,
                allowNull: false
            },
            role: {
                type: Sequelize.STRING,
                allowNull: false
            },
            image_url: {
                type: Sequelize.STRING
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
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    }
}