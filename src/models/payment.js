'use-strict'
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    static associate(models) {
      payment.belongsTo(models.order, { foreignKey: 'order_id', onDelete: 'CASCADE' });
    }
  }
  payment.init({
    order_id: DataTypes.INTEGER,
    method: DataTypes.STRING,
    bank_code: DataTypes.STRING,
    status: DataTypes.STRING,
    amount: DataTypes.DECIMAL(10, 2),
    currency: DataTypes.STRING,
    description: DataTypes.STRING,
    transaction_id: DataTypes.STRING,
    transaction_info: DataTypes.STRING,
    transaction_status: DataTypes.STRING,
    transaction_time: DataTypes.DATE,
    transaction_data: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'payment',
    timestamps: true
  });

  return payment;
};