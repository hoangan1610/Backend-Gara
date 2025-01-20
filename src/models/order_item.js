'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class order_item extends Model {
    static associate(models) {
      order_item.belongsTo(models.order, { foreignKey: 'order_id', onDelete: 'CASCADE' });
      order_item.belongsTo(models.product, { foreignKey: 'product_id', onDelete: 'SET NULL' });
      order_item.belongsTo(models.product_option, { foreignKey: 'product_option_id', onDelete: 'SET NULL' });
    }
  }
  order_item.init({
    order_id: { type: DataTypes.INTEGER },
    product_id: { type: DataTypes.INTEGER },
    product_option_id: { type: DataTypes.INTEGER },
    quantity: { type: DataTypes.BIGINT },
    price: { type: DataTypes.DECIMAL },
    currency: { type: DataTypes.STRING },
    note: { type: DataTypes.TEXT }
  }, {
    sequelize,
    modelName: 'order_item',
    timestamps: true
  });
  return order_item;
}