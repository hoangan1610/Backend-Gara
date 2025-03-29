'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    static associate(models) {
      order.hasMany(models.order_item, { foreignKey: 'order_id', onDelete: 'SET NULL', });
      order.belongsTo(models.user, { foreignKey: 'user_id', onDelete: 'SET NULL' });
      order.hasOne(models.payment, { foreignKey: 'order_id', onDelete: 'SET NULL' });
    }
  }
  order.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: true
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    info: {
      type: DataTypes.JSON,
      allowNull: true
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: true
    },
    payment_bank_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'order',
    timestamps: true
  });
  return order;
}