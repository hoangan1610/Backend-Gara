// controllers/EmailOTPController.js
import nodemailer from 'nodemailer';

// Lưu OTP tạm thời (cho demo; production nên dùng Redis hoặc DB)
const otpStore = {};

// Hàm tạo OTP 6 chữ số
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export class EmailOTPController {
  async sendEmailOTP(req, res) {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
      }

      // Tạo OTP và lưu kèm thời gian hết hạn (5 phút)
      const otp = generateOTP();
      otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

      // Cấu hình nodemailer sử dụng biến môi trường SMTP_EMAIL và SMTP_PASSWORD
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.SMTP_EMAIL, // VD: vkq0919309031@gmail.com
          pass: process.env.SMTP_PASSWORD, // mật khẩu (lưu ý: có thể cần app password)
        },
      });

      const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject: 'Your Email OTP Code',
        text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
      };

      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true, message: 'Email OTP sent successfully' });
    } catch (error) {
      console.error('Error sending email OTP:', error);
      return res.status(500).json({ success: false, message: 'Error sending email OTP' });
    }
  }

  async verifyEmailOTP(req, res) {
    try {
      const { email, otp } = req.body;
      if (!email || !otp) {
        return res.status(400).json({ success: false, message: 'Email and OTP are required' });
      }

      const record = otpStore[email];
      if (!record) {
        return res.status(400).json({ success: false, message: 'OTP not found or expired' });
      }

      if (Date.now() > record.expires) {
        delete otpStore[email];
        return res.status(400).json({ success: false, message: 'OTP expired' });
      }

      if (record.otp !== otp) {
        return res.status(400).json({ success: false, message: 'Invalid OTP' });
      }

      // Xác nhận thành công, xóa OTP khỏi bộ nhớ
      delete otpStore[email];
      return res.status(200).json({ success: true, verified: true });
    } catch (error) {
      console.error('Error verifying email OTP:', error);
      return res.status(500).json({ success: false, message: 'Error verifying email OTP' });
    }
  }
}
