import db from "../models";

export default class OrderService {
  constructor() {
    this.model = db.order;
  }

  findOrCreate = async (options) => {
    try {
      const [result, created] = await this.model.findOrCreate(options);
      return [result, created];
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async create(data, options = {}) {
    try {
      console.log(data);
      const result = await this.model.create(data, options);
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async update(data, options = {}) {
    try {
      const { id, ...filteredData } = data;
      const result = await this.model.update(filteredData, { where: { id: id }, ...options });
      let product = await this.model.findOne({ where: { id: id } });
      return product;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async delete(option = {}) {
    try {
      const result = await this.model.destroy(option);
      return result;
    } catch (error) {
      console.error(error);
      return null;
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
      console.error(error);
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

  // Thêm method createOrderItem
  async createOrderItem(orderId, item, options = {}) {
    try {
      // Tính giá: nếu có product_option.price thì ưu tiên, ngược lại lấy product.price
      const price = item.product_option && item.product_option.price
        ? item.product_option.price
        : item.product.price;
      // Đặt currency mặc định, ví dụ "VND"
      const currency = "VND";
      return await db.order_item.create({
        order_id: orderId,
        product_id: item.product.id,
        product_option_id: item.product_option?.id || null,
        quantity: item.quantity,
        price: price,
        currency: currency
      }, options);
    } catch (error) {
      console.error("Error in createOrderItem:", error);
      throw error;
    }
  }

  async getMonthlyCashflowStatsByUser(userId, year) {
    try {
      const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
      const endDate = new Date(`${year + 1}-01-01T00:00:00.000Z`);
  
      const result = await this.model.findAll({
        attributes: [
          [db.sequelize.fn('MONTH', db.sequelize.col('createdAt')), 'month'],
          'status',
          [db.sequelize.fn('SUM', db.sequelize.col('total_amount')), 'total']
        ],
        where: {
          user_id: userId,
          createdAt: {
            [db.Sequelize.Op.gte]: startDate,
            [db.Sequelize.Op.lt]: endDate
          }
        },
        group: ['month', 'status'],
        order: [[db.sequelize.fn('MONTH', db.sequelize.col('createdAt')), 'ASC']],
        raw: true
      });
  
      return result;
    } catch (error) {
      console.error('Lỗi khi thống kê dòng tiền trong service:', error);
      return null;
    }
  }  
  
}
