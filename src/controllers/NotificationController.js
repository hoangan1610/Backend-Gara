// src/controllers/NotificationController.js
import db from '../models/index.js'; // Import the db object containing all models
import { sendNotificationToUser } from '../server.js';

// Access the Notification model from db
const Notification = db.Notification;

export class NotificationController {
  async getByUserId(req, res) {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'userId is required' });
    }
    try {
      const notifications = await Notification.findAll({ where: { userId } });
      res.json({ success: true, result: notifications });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching notifications' });
    }
  }

  async markAsRead(req, res) {
    const { id } = req.params;
    try {
      const notification = await Notification.findByPk(id);
      if (!notification) {
        return res.status(404).json({ success: false, message: 'Notification not found' });
      }
      notification.read = true;
      await notification.save();
      sendNotificationToUser(notification.userId, notification);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error marking notification as read' });
    }
  }

  async markAllAsRead(req, res) {
    const userId = req.user.id;
    try {
      const [updatedCount] = await Notification.update(
        { read: true },
        { where: { userId, read: false } }
      );
      if (updatedCount === 0) {
        return res.json({
          success: true,
          message: 'Không có thông báo chưa đọc để đánh dấu',
        });
      }
      const updatedNotifications = await Notification.findAll({ where: { userId } });
      sendNotificationToUser(userId, updatedNotifications);
      res.json({ success: true, message: 'Đã đánh dấu tất cả thông báo là đã đọc' });
    } catch (error) {
      console.error('Lỗi khi đánh dấu tất cả thông báo:', error);
      res.status(500).json({
        success: false,
        message: 'Lỗi khi đánh dấu tất cả thông báo là đã đọc',
      });
    }
  }

  async createNotification(req, res) {
    const { userId, message, orderId } = req.body;
    try {
      console.log('Creating notification with data:', { userId, message, orderId });
      const newNotification = await Notification.create({ userId, message, orderId });
      sendNotificationToUser(userId, newNotification);
      res.status(201).json({ success: true, result: newNotification });
    } catch (error) {
      console.error('Error creating notification:', error);
      res.status(500).json({ success: false, message: 'Error creating notification', error: error.message });
    }
  }
}