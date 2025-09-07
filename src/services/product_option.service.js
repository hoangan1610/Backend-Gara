
import db from '../models/index';

class ProductOptionService {
  constructor() {
    this.model = db.product_option;
  }

  async create(data, options = {}) {
    try {
      const result = await this.model.create(data, options);
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
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

  async update(data, options = {}) {
    try {
      const { id, ...filteredData } = data;
      let result = await this.model.update(filteredData, { where: { id: id }, ...options });
      if (result[0] === 0) {
        return null;
      }
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async delete(options = {}) {
    try {
      const result = await this.model.destroy(options);
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
}

export default ProductOptionService;
