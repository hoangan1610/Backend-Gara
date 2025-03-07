import db from '../models';

export default class CartService {
    constructor() {
        this.model = db.cart;
    }

    async getByUserId(user_id) {
        try {
            const cart = await this.model.findOne({
                where: { user_id },
                include: [{
                    model: db.cart_item,
                    include: [db.product_option, { model: db.product, include: [db.product_option] }]
                }]
            });
            return cart || null;
        } catch (error) {
            console.error(error);
            throw error;
        }
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