import db from '../models';

export default class CartItemService {
    constructor() {
        this.model = db.cart_item;
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

    async update(data) {
        try {
            const { id, ...filteredData } = data;
            const result = await this.model.update(filteredData, { where: { id: id } });
            if (result[0] === 0) {
                return null;
            }
            let product = await this.model.findOne({ where: { id: id } });
            return product;
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