// src/server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import authenticateToken from './middlewares/authenticateToken.js';
import connectDB, { seedData, sequelizeSync } from './config/database.js';

// import từng route để chia public/protected
import authAPIRoute     from './routes/auth.route.js';
import productRoute     from './routes/product.route.js';
import cartAPIRoute     from './routes/cart.route.js';
import categoryRoute    from './routes/category.route.js';
import followRoute      from './routes/follow.route.js';
import userAPIRoute     from './routes/user.route.js';
import orderRoute       from './routes/order.route.js';
import adminApiRoute    from './routes/admin.route.js';
import uploadRoute      from './routes/upload.route.js';
import fileRoute        from './routes/file.route.js';
import publicAPIRoute   from './routes/public.route.js';
import taskAPIRoute     from './routes/task.route.js';
import reviewAPIRoute   from './routes/reviewRoute.js';
import emailOtpRoutes   from './routes/emailOtpRoutes.js';
import notificationRoute from './routes/notificationRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Socket.IO setup (giữ nguyên)
const io = new Server(server, { cors: { origin: true, methods: ['GET','POST'], credentials: true } });
io.on('connection', socket => {
  console.log('New socket connection:', socket.id);
  socket.on('joinNotificationRoom', userId => {
    if (userId) socket.join(`user_${userId}`);
  });
  socket.on('disconnect', () => console.log('Socket disconnected:', socket.id));
});
export const sendNotificationToUser = (userId, data) => io.to(`user_${userId}`).emit('notification', data);

// Middlewares chung
app.use(cors({ origin: true, credentials: true }));
app.use(helmet({ contentSecurityPolicy: false, xFrameOptions: false, crossOriginResourcePolicy: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(authenticateToken);

// === PUBLIC ROUTES (không cần token) ===
authAPIRoute(app);               // /api/v1/auth/*
app.use('/api', emailOtpRoutes); // /api/*
publicAPIRoute(app);
uploadRoute(app);
fileRoute(app);
taskAPIRoute(app);
reviewAPIRoute(app);

// === BẢO VỆ ĐƯỜNG DẪN SAU ĐÂY BẰNG JWT ===


productRoute(app);    // /api/v1/products/*
cartAPIRoute(app);    // /api/v1/cart/*
categoryRoute(app);   // /api/v1/categories/*
followRoute(app);     // /api/v1/follows/*
userAPIRoute(app);    // /api/v1/users/*
orderRoute(app);      // /api/v1/orders/*
adminApiRoute(app);   // /api/v1/admin/*
notificationRoute(app); // /api/v1/notifications/*

// Khởi động
const startServer = async () => {
  try {
    await connectDB();
    if (process.env.INIT_DATABASE === 'true') {
      await sequelizeSync();
      await seedData();
      console.log('DB initialized');
      return;
    }
    const port = process.env.PORT || 3001;
    server.listen(port, () => console.log(`Server ready on port ${port}`));
  } catch (err) {
    console.error('Startup error:', err);
  }
};
startServer();
