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

  getRatingStatus = async (req, res) => {
    try {
      const user = await this.getUserByToken(req, res);
      if (!user) return res.status(401).json({ message: "Không xác thực được người dùng." });
  
        const { orderId, orderItemId } = req.params;
  
        // Kiểm tra xem đơn hàng tồn tại và thuộc về người dùng
        const order = await this.orderService.getOne({
          where: { id: orderId, user_id: user.id },
        });
  
        if (!order) {
          return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }
  
        // Kiểm tra trạng thái đơn hàng
        if (order.status !== 'FINISHED') {
          return res.status(400).json({
            message: 'Chỉ có thể đánh giá sản phẩm trong đơn hàng đã hoàn thành.',
          });
        }
  
        // Kiểm tra xem order_item tồn tại và thuộc về đơn hàng
        const orderItem = await this.orderItemService.getOne({
          where: { id: orderItemId, order_id: orderId },
          include: [{ model: db.product, as: 'product' }],
        });
  
        if (!orderItem || !orderItem.product) {
          return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong đơn hàng' });
        }
  
        // Kiểm tra xem đã có đánh giá cho sản phẩm này chưa
        const existingReview = await db.ReviewService.getOne({
          where: {
            orderId: orderId,
            user_id: user.id,
            productId: orderItem.product.id,
          },
        });
  
        return res.status(200).json({
          hasRated: !!existingReview,
          rating: existingReview ? existingReview.rating : null,
          comment: existingReview ? existingReview.comment : null,
        });
      } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái đánh giá sản phẩm:', error);
        return res.status(500).json({
          message: 'Lỗi máy chủ nội bộ',
          error: error.message,
        });
      }
    };
  
    submitRating = async (req, res) => {
      try {
        const user = await this.getUserByToken(req, res);
        if (!user) return res.status(401).json({ message: "Không xác thực được người dùng." });
  
        const { orderId, orderItemId } = req.params;
        const { rating, comment } = req.body;
  
        // Kiểm tra dữ liệu đầu vào
        if (!rating || rating < 1 || rating > 5) {
          return res.status(400).json({
            message: 'Số sao đánh giá phải từ 1 đến 5.',
          });
        }
  
        // Kiểm tra xem đơn hàng tồn tại và thuộc về người dùng
        const order = await this.orderService.getOne({
          where: { id: orderId, user_id: user.id },
        });
  
        if (!order) {
          return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }
  
        // Kiểm tra trạng thái đơn hàng
        if (order.status !== 'FINISHED') {
          return res.status(400).json({
            message: 'Chỉ có thể đánh giá sản phẩm trong đơn hàng đã hoàn thành.',
          });
        }
  
        // Kiểm tra xem order_item tồn tại và thuộc về đơn hàng
        const orderItem = await this.orderItemService.getOne({
          where: { id: orderItemId, order_id: orderId },
          include: [{ model: db.product, as: 'product' }],
        });
  
        if (!orderItem || !orderItem.product) {
          return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong đơn hàng' });
        }
  
        // Sử dụng ReviewService để tạo đánh giá
        const result = await this.reviewService.createReview({
          userId: user.id,
          productId: orderItem.product.id,
          orderId: orderId,
          rating,
          comment,
        });
  
        return res.status(201).json({
          message: 'Đánh giá sản phẩm đã được gửi thành công.',
          review: {
            id: result.review.id,
            rating: result.review.rating,
            comment: result.review.comment,
            createdAt: result.review.createdAt,
          },
          newLoyaltyPoints: result.newLoyaltyPoints,
        });
      } catch (error) {
        console.error('Lỗi khi gửi đánh giá sản phẩm:', error);
        return res.status(500).json({
          message: error.message || 'Lỗi máy chủ nội bộ',
          error: error.message,
        });
      }
    };
}
