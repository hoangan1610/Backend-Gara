'use strict';
const {
    Model
} = require('sequelize');

// cart_item bao gồm: cart_id, product_id, serviceId, quantity
module.exports = (sequelize, DataTypes) => {
    class cart_item extends Model {
        static associate(db) {
            cart_item.belongsTo(db.cart, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
            cart_item.belongsTo(db.product, { foreignKey: 'product_id', onDelete: 'CASCADE' });
            cart_item.belongsTo(db.product_option, { foreignKey: 'product_option_id', onDelete: 'SET NULL' });
        }
    }
    cart_item.init({
        cart_id: DataTypes.INTEGER,
        product_id: DataTypes.INTEGER,
        product_option_id: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'cart_item',
        timestamps: true
    });
    return cart_item;
}