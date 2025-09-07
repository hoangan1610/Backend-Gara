'use-strict';

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class cost extends Model {
    static associate(models) {
      cost.belongsTo(models.product, { foreignKey: 'product_id', onDelete: 'SET NULL' });
      cost.belongsTo(models.user, { as: "employee", foreignKey: 'employee_id', onDelete: 'SET NULL' });
    }
  }
  cost.init({
    total_cost: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    cost_type: {
      type: DataTypes.ENUM('PURCHASE', 'SALARY', 'MAINTENANCE', 'OTHER'),
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'cost',
    timestamps: true
  });
  return cost;
}