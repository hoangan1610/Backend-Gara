'use strict';
const {
    Model
} = require('sequelize');

// user bao gồm: email, password, first_name, last_name, address, phone, gender, roleId, positionId
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        static associate(models) {
            user.hasOne(models.cart, { foreignKey: 'user_id', onDelete: 'SET NULL' });
            user.hasMany(models.order, { foreignKey: 'user_id', onDelete: 'SET NULL' });
            user.hasMany(models.product_follow, { foreignKey: 'user_id', onDelete: 'SET NULL' });
            user.hasMany(models.cost, { foreignKey: 'employee_id', onDelete: 'SET NULL' });
            user.hasMany(models.task, { foreignKey: 'assignedTo', onDelete: 'SET NULL', as: 'employee' });
        }
        getFullName() {
            return `${this.firstName} ${this.lastName}`;
        }

        toJSON() {
            let { hashed_password, ...data } = this.get();
            const full_name = this.getFullName();
            return { ...data, full_name };
        }

        static hash_password(password) {
            const bcrypt = require('bcryptjs');
            require('dotenv').config();
            const salt = process.env.SALT;
            return bcrypt.hashSync(password, salt);
        }

        static compare_password(password) {
            const bcrypt = require('bcryptjs');
            return bcrypt.compareSync(password, this.get().hashed_password);
        }
    }
    user.init({
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        hashed_password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
        },
        birth: {
            type: DataTypes.DATE,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        sequelize,
        modelName: 'user',
        timestamps: true
    });

    return user;
}
