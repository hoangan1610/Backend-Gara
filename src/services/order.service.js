
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
      console.log(data)
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
}