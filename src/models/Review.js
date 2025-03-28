'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // Mỗi review thuộc về một user, sử dụng alias "user" để lấy avatar và các trường khác.
      Review.belongsTo(models.user, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
      // Mỗi review thuộc về một product
      Review.belongsTo(models.product, { foreignKey: 'productId', onDelete: 'CASCADE' });
      // Liên kết review với order (để đảm bảo chỉ đánh giá những sản phẩm đã mua)
      Review.belongsTo(models.order, { foreignKey: 'orderId', onDelete: 'CASCADE' });
    }
  }
  
  Review.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Review',
      timestamps: true,
    }
  );
  
  return Review;
};
