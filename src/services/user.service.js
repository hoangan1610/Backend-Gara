// UserService.js
import bcrypt from 'bcryptjs';
import db from '../models/index';
import CartService from './cart.service';

require('dotenv').config();

const salt = process.env.SALT;

class UserService {
    constructor() {
        this.model = db.user;
    }

    async query(query) {
        try {
            let entries = Object.entries(query);

            let where = {};
            for (let [key, value] of entries) {
                where[key] = { [db.Sequelize.Op.like]: `%${value}%` }
            }

            let data = await this.model.findAll({ where });

            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async hashUserPassword(password) {
        try {
            return this.model.hash_password(password);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createUser(data) {
        try {
            const hashPasswordFromBcrypt = await this.hashUserPassword(data.password);
            await this.model.create({
                email: data.email,
                hashed_password: hashPasswordFromBcrypt,
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                birth: data.birth,
                role: data.role
            });
            return 'Create a new user successful';
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getFullUserInfoById(user_id) {
        try {
          const user = await this.model.findOne({
            where: { id: user_id },
            // Cập nhật attributes để lấy thêm email, birth, gender, image_url
            attributes: ['id', 'email', 'first_name', 'last_name', 'address', 'phone', 'gender', 'birth', 'image_url'],
            include: [
              {
                model: db.cart,
                as: 'cart',
                attributes: ['id'],
                include: [
                  {
                    model: db.cart_item,
                    as: 'cart_items',
                    attributes: ['id', 'quantity'],
                    include: [
                      {
                        model: db.product_option,
                        as: 'product_option',
                        attributes: ['id', 'name', 'price']
                      },
                      {
                        model: db.product,
                        as: 'product',
                        attributes: ['id', 'name', 'image_url'],
                        include: [
                          {
                            model: db.product_option,
                            as: 'product_options',
                            attributes: ['id', 'name', 'price']
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                model: db.order,
                as: 'orders',
                attributes: ['id', 'createdAt', 'status'],
                limit: 5,
                order: [['createdAt', 'DESC']],
                include: [
                  {
                    model: db.order_item,
                    as: 'order_items',
                    attributes: ['id', 'quantity'],
                    include: [
                      {
                        model: db.product,
                        as: 'product',
                        attributes: ['id', 'name', 'image_url']
                      },
                      {
                        model: db.product_option,
                        as: 'product_option',
                        attributes: ['id', 'name', 'price']
                      }
                    ]
                  },
                  {
                    model: db.payment,
                    as: 'payment',
                    attributes: ['id', 'status', 'amount']
                  }
                ]
              },
              {
                model: db.product_follow,
                as: 'product_follows',
                attributes: ['id', 'product_id']
              }
            ]
          });
          return user || null;
        } catch (error) {
          console.error(error);
          return null;
        }
      }
      
      
      
      
      
      
    async updateUser(data) {
        try {
            const user = await this.model.findOne({ where: { id: data.id } });
            if (user) {
                user.first_name = data.first_name;
                user.last_name = data.last_name;
                user.address = data.address;
                await user.save();
                return await this.model.findAll();
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteUser(user_id) {
        try {
            const user = await this.model.findOne({ where: { id: user_id } });
            if (user) {
                await user.destroy();
            }
            return null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserInfoByEmail(userEmail) {
        try {
            if (!userEmail) return null;
            const user = await this.model.findOne({ where: { email: userEmail } });
            return user || null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateUserPassword(data) {
        try {
            const user = await this.model.findOne({ where: { email: data.email } });
            if (user) {
                user.hashed_password = await this.hashUserPassword(data.password);
                await user.save();
                return user;
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async compareUserPassword(password, hashed_password) {
        try {
            if (!password || !hashed_password) {
                return false;
            }
            return await bcrypt.compare(password, hashed_password);
        } catch (error) {
            return false;
        }
    }

    async create(data, options = {}) {
        try {
            console.log(data)
            const result = await this.model.create(data, options);
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async update(data) {
        try {
          const { id, ...filteredData } = data;
          // Lệnh update của Sequelize trả về một mảng, phần tử đầu tiên là số lượng dòng bị ảnh hưởng
          const [affectedRows] = await this.model.update(filteredData, { where: { id } });
          console.log(`UserService.update: Affected rows: ${affectedRows}`);
          return affectedRows;
        } catch (error) {
          console.error("UserService.update error:", error);
          return null;
        }
      }
      

    async delete(options = {}) {
        try {
            await this.model.destroy(options);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getById(id) {
        try {
            const result = await this.model.findOne({ where: { id: id } });
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getAll(options = {}) {
        try {
            const result = await this.model.findAll(options);
            return result;
        } catch (error) {
            return null;
        }
    }

    async getOne(options = {}) {
        try {
            const result = await this.model.findOne(options);
            return result;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async searchAndCountAll(options = {}) {
        try {
            const { rows, count } = await this.model.findAndCountAll(options);
            return { rows, count };
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default UserService;
