import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import authenticateToken from './middlewares/authenticateToken.js';
import connectDB, { seedData, sequelizeSync } from './config/database.js';
import { applyAllRoutes } from './routes';
import emailOtpRoutes from './routes/emailOtpRoutes.js'; // Import router OTP email

import dotenv from 'dotenv';
dotenv.config();

const startServer = async () => {
  try {
    const app = express();

    // Cấu hình CORS
    app.use(cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    }));

    // Cấu hình ứng dụng
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({ extended: true }));

    // Middlewares bảo mật
    app.use(authenticateToken);
    app.use(helmet({
      contentSecurityPolicy: false,
      xFrameOptions: false,
      crossOriginResourcePolicy: false,
    }));

    // Đăng ký các route hiện có
    applyAllRoutes(app);

    // Đăng ký router OTP email
    // Các endpoint mới sẽ có dạng:
    // POST /api/send-email-otp
    // POST /api/verify-email-otp
    app.use('/api', emailOtpRoutes);

    // Kết nối cơ sở dữ liệu
    await connectDB();
    const INIT_DATABASE = process.env.INIT_DATABASE;
    if (INIT_DATABASE === 'true') {
      await sequelizeSync();
      await seedData();
      console.log("Database is initialized. Process has been completed");
      return;
    }

    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log('NODE_OPTIONS:', process.env.NODE_OPTIONS);
      console.log(`Backend Nodejs is running on port: ${port}`);
    });
  } catch (error) {
    console.error('Lỗi khi khởi động server:', error);
  }
};

startServer();
