import db from '../models';

class TaskService {
    constructor() {
        this.model = db.task; // Đảm bảo rằng bảng task đã được định nghĩa trong Sequelize models
    }

    async create(data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getAll(options = {}) {
        try {
            return await this.model.findAll(options);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getOne(options = {}) {
        try {
            return await this.model.findOne(options);
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async update(data) {
        try {
            const { id, ...updates } = data;
            await this.model.update(updates, { where: { id } });
            return await this.getOne({ where: { id } });
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async delete(id) {
        try {
            return await this.model.destroy({ where: { id } });
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

export default TaskService;
