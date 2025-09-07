import express from 'express';
import { NotificationController } from '../controllers/NotificationController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

export default (app) => {
  const router = express.Router();
  const controller = new NotificationController();

  // Đưa route tĩnh lên trước route động để tránh match nhầm
  router.get('/', controller.getByUserId);
  router.patch('/mark-all-read', authenticateToken, controller.markAllAsRead);
  router.patch('/:id', authenticateToken, controller.markAsRead);
  router.post('/', controller.createNotification);

  app.use('/api/v1/notifications', router);
};
