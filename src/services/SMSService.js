// services/SMSService.js

import twilio from 'twilio';

export class SMSService {
  constructor() {
    // Khởi tạo client Twilio với thông tin cấu hình từ biến môi trường
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  /**
   * Hàm định dạng số điện thoại theo chuẩn E.164 cho Việt Nam.
   * Nếu số điện thoại bắt đầu bằng "0", chuyển thành "+84" + phần còn lại.
   * Nếu đã có dấu "+" thì giữ nguyên.
   * @param {string} phone - Số điện thoại cần định dạng.
   * @returns {string} - Số điện thoại theo định dạng E.164.
   */
  formatPhoneNumber(phone) {
    if (!phone) return phone;
    // Nếu số điện thoại đã có dấu "+"
    if (phone.startsWith('+')) {
      return phone;
    }
    // Nếu số điện thoại bắt đầu bằng "0", chuyển đổi thành định dạng quốc tế cho Việt Nam.
    if (phone.startsWith('0')) {
      return '+84' + phone.substring(1);
    }
    // Nếu không, trả về nguyên số
    return phone;
  }

  /**
   * Gửi OTP qua SMS đến số điện thoại của người dùng.
   * @param {Object} param0 - Tham số gồm: phone (số điện thoại) và otp (mã OTP).
   * @returns {Promise<Object>} - Kết quả gửi tin nhắn.
   */
  async sendOTP({ phone, otp }) {
    try {
      const formattedPhone = this.formatPhoneNumber(phone);
      const message = await this.client.messages.create({
        body: `Mã OTP của bạn là: ${otp}. Mã này có hiệu lực trong 10 phút.`,
        from: process.env.TWILIO_PHONE_NUMBER, // Số gửi (do Twilio cấp)
        to: formattedPhone, // Số người nhận đã được định dạng theo E.164
      });
      console.log("OTP SMS sent: ", message.sid);
      return message;
    } catch (error) {
      console.error("Error sending OTP SMS:", error);
      throw error;
    }
  }
}
