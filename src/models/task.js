'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(models) {
            // Task belongs to an employee
            Task.belongsTo(models.user, { foreignKey: 'employee_id', onDelete: 'SET NULL', as: 'employee' });

            // Task assigned by an admin
            Task.belongsTo(models.user, { foreignKey: 'admin_id', onDelete: 'SET NULL', as: 'admin' });
        }
    }
    Task.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Title cannot be empty" }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('pending', 'in_progress', 'awaiting_confirmation', 'completed', 'rejected'),
            allowNull: false,
            defaultValue: 'pending'
        },
        assigned_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isAfterNow(value) {
                    if (value && new Date(value) < new Date()) {
                        throw new Error("Deadline must be a future date");
                    }
                }
            }
        },
        completion_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'task',
        timestamps: true // Automatically adds createdAt and updatedAt
    });

    return Task;
};
