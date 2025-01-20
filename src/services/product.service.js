
import db from '../models/index';

class ProductService {
    constructor() {
        this.model = db.product;
    }

    async searchAndCountProducts({ searchTerm, category_id, category_path, page, limit }) {
        try {
            const results = await this.model.findAndCountAll({
                where: {
                    ...(category_id && parseInt(category_id) !== -1 && { category_id: parseInt(category_id) }),
                    ...(searchTerm && { path: { [db.Sequelize.Op.like]: `%${searchTerm}%` } }),
                    ...(category_path && { '$category.path$': category_path })
                },
                include: [db.category],
                order: [['createdAt', 'DESC']],
                limit: parseInt(limit) || 10,
                offset: page ? ((page - 1) * (limit || 10)) : 0
            });
            return results || null;
        } catch (error) {
            console.error(error);
            throw error;
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

    async query(query) {
        try {
            let entries = Object.entries(query);

            let where = {};
            for (let [key, value] of entries) {
                where[key] = { [db.Sequelize.Op.like]: `%${value}%` }
            }
            // console.log(where)
            let data = await this.model.findAll({ where }, include[db.category, db.product_option]);
            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async update(data, options = {}) {
        try {
            const { id, ...filteredData } = data;
            const result = await this.model.update(filteredData, { where: { id: id }, ...options });
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

export default ProductService;
