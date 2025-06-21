import db from '../models';
const { Review, user, order, order_item } = db;

export class ReviewService {
  async createReview({ userId, productId, orderId, rating, comment }) {
    // Kiểm tra xem đã có review nào cho đơn hàng này với sản phẩm này chưa
    const existingReview = await Review.findOne({ where: { userId, productId, orderId } });
    if (existingReview) {
      throw new Error('Bạn đã đánh giá sản phẩm này trong đơn hàng này rồi.');
    }

    // Kiểm tra xem đơn hàng có tồn tại với orderId và thuộc về người dùng không
    const foundOrder = await order.findOne({ where: { id: orderId, user_id: userId } });
    if (!foundOrder) {
      throw new Error('Bạn chưa đặt sản phẩm này, không thể đánh giá.');
    }
    
    // Kiểm tra xem đơn hàng đó có chứa sản phẩm hay không trong bảng order_item
    const foundOrderItem = await order_item.findOne({ 
      where: { order_id: orderId, product_id: productId } 
    });
    if (!foundOrderItem) {
      throw new Error('Sản phẩm này không tồn tại trong đơn hàng của bạn, không thể đánh giá.');
    }
    
    // Nếu kiểm tra thành công, tạo review mới
    const newReview = await Review.create({
      userId,
      productId,
      orderId,
      rating,
      comment,
    });
    
    // Cộng điểm thưởng cho người dùng (ví dụ: +10 điểm)
    const pointsToAdd = 10;
    const foundUser = await user.findByPk(userId);
    foundUser.loyaltyPoints = (foundUser.loyaltyPoints || 0) + pointsToAdd;
    await foundUser.save();
    
    return {
      review: newReview,
      newLoyaltyPoints: foundUser.loyaltyPoints,
    };
  }

  async getOne(options = {}) {
    try {
      const result = await Review.findOne(options);
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default new ReviewService();
