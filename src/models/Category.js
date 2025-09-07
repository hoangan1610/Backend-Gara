'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class category extends Model {
        static associate(models) {
            category.hasMany(models.product, { foreignKey: 'category_id', onDelete: 'SET NULL' });
        }
    }
    category.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        path: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        image_url: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    }, {
        sequelize,
        modelName: 'category',
        timestamps: true
    });
    return category;
}
