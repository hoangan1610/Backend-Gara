import ReviewService from '../services/ReviewService';
import db from '../models';

export class ReviewController {
  constructor() {
    this.reviewService = ReviewService;
    this.createReview = this.createReview.bind(this);
  }
  
  async createReview(req, res) {
    try {
      const { productId, rating, comment, orderId } = req.body;
      if (!productId || !rating || !orderId) {
        return res.status(400).json({ message: 'Thiếu thông tin cần thiết' });
      }
      // Lấy userId từ req.user (được set bởi middleware)
      const userId = req.user.id;
      const result = await this.reviewService.createReview({
        userId,
        productId,
        orderId,
        rating,
        comment,
      });
      return res.status(201).json({
        message: "Đánh giá thành công và đã cộng điểm thưởng",
        review: result.review,
        newLoyaltyPoints: result.newLoyaltyPoints,
      });
    } catch (error) {
      console.error("Error in createReview:", error);
      return res.status(500).json({ message: error.message || "Lỗi server" });
    }
  }
  
  // GET /api/v1/review?productId=...
  static async getReviews(req, res) {
    try {
      const { productId } = req.query;
      if (!productId) {
        return res.status(400).json({ message: "ProductId is required" });
      }
      // Lấy tất cả review của sản phẩm, include thông tin user với các trường cần thiết (sử dụng image_url thay cho avatar)
      const reviews = await db.Review.findAll({
        where: { productId },
        include: [
          {
            model: db.user,
            as: "user", // dùng alias "user" đã định nghĩa trong association
            attributes: ["id", "first_name", "last_name", "image_url"]
          }
        ],
        order: [["createdAt", "DESC"]]
      });
      return res.status(200).json({ reviews });
    } catch (error) {
      console.error("Error in getReviews:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
