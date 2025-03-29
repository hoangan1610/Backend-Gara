import express from 'express';
import { ReviewController } from '../controllers/ReviewController';
import authenticateToken from '../middlewares/authenticateToken.js'; // đảm bảo đúng đường dẫn

const reviewRouter = express.Router();

// POST /api/v1/review -> Tạo review
reviewRouter.post("/", authenticateToken, new ReviewController().createReview);

// GET /api/v1/review?productId=... -> Lấy danh sách review cho sản phẩm
reviewRouter.get("/", authenticateToken, ReviewController.getReviews);

const reviewAPIRoute = (app) => {
  return app.use("/api/v1/review", reviewRouter);
};

export default reviewAPIRoute;
