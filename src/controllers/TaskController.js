import db from '../models';
import { TaskService } from '../services';

class TaskController {
    // Tạo mới task
    async create(req, res) {
        try {
          const { title, description, employee_id, deadline } = req.body;
    
          if (!title || !employee_id) {
            return res.status(400).json({ message: "Missing required fields" });
          }
    
          const newTask = await new TaskService().create({
            title,
            description,
            employee_id,
            admin_id: req.user.id,
            deadline,
          });
    
          // Create a notification for the assigned employee
          const notificationData = {
            user_id: employee_id,
            message: `New task "${title}" assigned to you.`,
            read: false,
          };
    
          await new NotificationService().createNotification(notificationData);
    
          return res.status(201).json({ message: "Task created successfully", task: newTask });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal server error" });
        }
      }

    // Cập nhật task
    async update(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const task = await new TaskService().getOne({ where: { id } });

            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            // Kiểm tra quyền truy cập: chỉ admin hoặc employee có quyền sửa task
            if (req.user.role !== 'admin' && req.user.id !== task.employee_id && req.user.role !== 'SUPER_ADMIN') {
                return res.status(403).json({ message: "You don't have permission to update this task" });
            }

            const updatedTask = await new TaskService().update({ id, ...updates });

            return res.status(200).json({ message: "Task updated successfully", task: updatedTask });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    // Lấy danh sách tất cả task
    async getAll(req, res) {
        try {
            const isAdminOrSuperAdmin = req.user.role === 'admin' || req.user.role === 'SUPER_ADMIN';
    
            const tasks = await new TaskService().getAll({
                where: isAdminOrSuperAdmin ? {} : { employee_id: req.user.id },
                include: [
                    { model: db.user, as: 'employee', attributes: ['id', 'first_name', 'last_name'] },
                    { model: db.user, as: 'admin', attributes: ['id', 'first_name', 'last_name'] },
                ],
            });
    
            return res.status(200).json({ tasks });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    // Xóa task
    async delete(req, res) {
        try {
            const { id } = req.params;
    
            const task = await new TaskService().getOne({ where: { id } });
    
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
    
            // Kiểm tra xem người dùng có phải là admin hoặc super admin không
            if (req.user.role !== 'admin' && req.user.role !== 'SUPER_ADMIN') {
                return res.status(403).json({ message: "You don't have permission to delete this task" });
            }
    
            await new TaskService().delete(id);
    
            return res.status(200).json({ message: "Task deleted successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    
    async getOne(req, res) {
        try {
            const { id } = req.params;
            const task = await new TaskService().getOne({ where: { id } });

            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }

            return res.status(200).json({ task });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

}


export default TaskController;
