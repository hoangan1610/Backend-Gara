'use strict';
const {
    Model
} = require('sequelize');

// Cart bao gồm id, createdAt, updatedAt, listCartItems
module.exports = (sequelize, DataTypes) => {
    class cart extends Model {
        static associate(models) {
            cart.hasMany(models.cart_item, { foreignKey: 'cart_id', onDelete: 'SET NULL' });
            cart.belongsTo(models.user, { foreignKey: 'user_id', onDelete: 'CASCADE' });
        }
    }
    cart.init({
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
    }, {
        sequelize,
        modelName: 'cart',
        timestamps: true
    });
    return cart;
}