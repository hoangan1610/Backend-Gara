'use-strict'
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class product_follow extends Model {
        static associate(models) {
            product_follow.belongsTo(models.product, { foreignKey: 'product_id', onDelete: 'CASCADE' });
            product_follow.belongsTo(models.user, { foreignKey: 'user_id', onDelete: 'CASCADE' });
        }
    }
    product_follow.init({
        product_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'product_follow',
        timestamps: true
    });

    return product_follow;
};