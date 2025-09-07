// src/routes/index.js
import authAPIRoute from './auth.route.js';
import productRoute from './product.route.js';
import cartAPIRoute from './cart.route.js';
import categoryRoute from './category.route.js';
import followRoute from './follow.route.js';
import userAPIRoute from './user.route.js';
import orderRoute from './order.route.js';
import adminApiRoute from './admin.route.js';
import apllyUploadRouter from './upload.route.js';
import applyFileRoutes from './file.route.js';
import publicAPIRoute from './public.route.js';
import taskAPIRoute from './task.route.js';
import reviewAPIRoute from './reviewRoute.js';
import notificationRoute from './notificationRoutes.js';

export {
  authAPIRoute,
  productRoute,
  cartAPIRoute,
  categoryRoute,
  followRoute,
  userAPIRoute,
  orderRoute,
  adminApiRoute,
  apllyUploadRouter,
  applyFileRoutes,
  publicAPIRoute,
  taskAPIRoute,
  reviewAPIRoute,
  notificationRoute,
};

export const applyAllRoutes = (app) => {
  authAPIRoute(app);
  productRoute(app);
  cartAPIRoute(app);
  categoryRoute(app);
  followRoute(app);
  userAPIRoute(app);
  orderRoute(app);
  adminApiRoute(app);
  apllyUploadRouter(app);
  applyFileRoutes(app);
  publicAPIRoute(app);
  taskAPIRoute(app);
  reviewAPIRoute(app);
  notificationRoute(app);
};