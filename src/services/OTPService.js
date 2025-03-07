// services/OTPService.js

/**
 * OTPService dùng để lưu trữ, truy xuất và xoá OTP cùng với dữ liệu đăng ký tạm thời.
 * Ở đây sử dụng in-memory store (Map) với key là số điện thoại.
 * Trong production, bạn nên sử dụng Redis hoặc cơ sở dữ liệu.
 */
export class OTPService {
    constructor() {
      // Key: phone number, Value: thông tin OTP cùng các dữ liệu đăng ký
      this.otpStore = new Map();
    }
  
    /**
     * Lưu thông tin OTP và dữ liệu đăng ký tạm thời.
     * @param {Object} data - Dữ liệu cần lưu gồm: phone, otp, expiresAt, password, first_name, last_name, birth, role.
     * @returns {Promise<Object>} - Trả về dữ liệu vừa lưu.
     */
    async saveOTP(data) {
      this.otpStore.set(data.phone, data);
      return data;
    }
  
    /**
     * Lấy thông tin OTP theo số điện thoại.
     * @param {string} phone - Số điện thoại của người dùng.
     * @returns {Promise<Object|null>} - Trả về thông tin OTP nếu có, hoặc null nếu không tồn tại.
     */
    async getOTPByPhone(phone) {
      return this.otpStore.get(phone) || null;
    }
  
    /**
     * Xoá thông tin OTP theo số điện thoại.
     * @param {string} phone - Số điện thoại của người dùng.
     * @returns {Promise<boolean>} - Trả về true nếu xoá thành công.
     */
    async deleteOTP(phone) {
      return this.otpStore.delete(phone);
    }
  }
  