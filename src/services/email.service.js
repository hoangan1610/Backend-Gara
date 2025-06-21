import { contact_information, email_constants, logos } from "../constants/constants";
import sendEmail from "../utils/sendEmail";
import { formatNumberWithCommas } from "../utils/stringUtils";
import nodemailer from 'nodemailer';


export default class EmailService {
  constructor() { }

  async sendUpdateEmailOtp({ email, otp }) {
    try {
      // Tạo transporter sử dụng cấu hình từ biến môi trường
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST, // Ví dụ: 'smtp.gmail.com'
        port: Number(process.env.EMAIL_PORT), // Ví dụ: 587
        secure: process.env.EMAIL_SECURE === 'true', // true nếu sử dụng port 465
        auth: {
          user: process.env.EMAIL_USER, // Email của bạn
          pass: process.env.EMAIL_PASS, // Mật khẩu hoặc app password
        },
      });

      // Cấu hình nội dung email
      const mailOptions = {
        from: process.env.EMAIL_FROM, // Ví dụ: '"Your App" <no-reply@yourapp.com>'
        to: email,
        subject: 'Xác thực đổi email',
        text: `Mã OTP của bạn là: ${otp}. OTP này có hiệu lực trong 5 phút.`,
        // Nếu muốn gửi dạng HTML:
        // html: `<p>Mã OTP của bạn là: <strong>${otp}</strong>. OTP này có hiệu lực trong 5 phút.</p>`
      };

      // Gửi email
      await transporter.sendMail(mailOptions);
      console.log(`OTP đã được gửi đến ${email}`);
      return true;
    } catch (error) {
      console.error("Error in sendUpdateEmailOtp:", error);
      throw error;
    }
  }


  async sendResetPasswordOTP({ email, otp }) {
    await sendEmail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Mã OTP đặt lại mật khẩu',
      html: `
        <div style="background-color: #f3f4f6; min-height: 100vh; padding: 1rem;">
          <div style="max-width: 40rem; margin: 0 auto; background-color: white; border-radius: 0.5rem; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
            <div style="padding: 2rem;">
              <h1 style="font-size: 1.875rem; font-weight: bold; color: #1f2937; text-align: center; margin-bottom: 1rem;">
                Mã OTP đặt lại mật khẩu
              </h1>
              <p style="color: #4b5563; font-size: 1.125rem; text-align: center; margin-bottom: 2rem;">
                Mã OTP của bạn là: <strong>${otp}</strong>
              </p>
              <p style="color: #6b7280; text-align: center;">Mã này có hiệu lực trong 5 phút.</p>
            </div>
            <footer style="background-color: #f9fafb; padding: 1.5rem 2rem;">
              <div style="text-align: center; color: #4b5563; font-size: 0.875rem;">
                <p style="margin-bottom: 0.5rem;">© 2024 Công ty. Mọi quyền được bảo lưu.</p>
                <a href="${process.env.CONTACT_HELP_LINK}" style="color: #2563eb; text-decoration: none;">
                  Liên hệ hỗ trợ
                </a>
              </div>
            </footer>
          </div>
        </div>
      `
    });
  }

  

  sendRegisterEmailOtp = async ({ email, otp }) => {
    await sendEmail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Xác thực Email - Mã OTP của bạn',
      html: `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h2>Xác thực Email</h2>
          <p>Mã OTP của bạn là: <strong>${otp}</strong></p>
          <p>Mã OTP này sẽ hết hạn trong 5 phút.</p>
        </div>
      `
    });
  }


  sendResetPasswordEmail = async ({ email, token }) => {
    const resetLink = `${process.env.CLIENT_URL}/auth/reset-password/${token}`;

    await sendEmail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Yêu cầu đặt lại mật khẩu',
      html: `
      <div style="background-color: #f3f4f6; min-height: 100vh; padding: 1rem;">
        <div style="max-width: 40rem; margin: 0 auto; background-color: white; border-radius: 0.5rem; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <div style="padding: 2rem;">
            <h1 style="font-size: 1.875rem; font-weight: bold; color: #1f2937; text-align: center; margin-bottom: 1rem;">Đặt lại mật khẩu của bạn</h1>
            <p style="color: #4b5563; font-size: 1.125rem; text-align: center; margin-bottom: 2rem;">Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Hãy nhấn vào nút bên dưới để đặt lại mật khẩu.</p>
            
            <div style="text-align: center; margin-bottom: 2rem;">
              <a href="${resetLink}" style="display: inline-block; background-color: #2563eb; color: white; font-weight: bold; padding: 0.75rem 2rem; border-radius: 9999px; transition: transform 0.3s, box-shadow 0.3s; text-decoration: none;">
                Đặt Lại Mật Khẩu
              </a>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 1.5rem;">
              <p style="color: #6b7280; font-size: 0.875rem; text-align: center;">Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
            </div>
          </div>
          
          <footer style="background-color: #f9fafb; padding: 1.5rem 2rem;">
            <div style="text-align: center; color: #4b5563; font-size: 0.875rem;">
              <p style="margin-bottom: 0.5rem;">© 2024 Công ty. Mọi quyền được bảo lưu.</p>
              <a href="${email_constants.contact_help_link}" style="color: #2563eb; text-decoration: none;">Liên hệ hỗ trợ</a>
            </div>
          </footer>
        </div>
      </div>`
    });
  }

  sendOrderPendingEmail = async ({ email, order }) => {
    await sendEmail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Đơn hàng của bạn đã sẵn sàng',
      html: `
<div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #ffffff; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); border-radius: 8px;">
  <header style="text-align: center; padding: 20px 0; border-bottom: 2px solid #f0f0f0;">
    <img src="${logos.company_logo}" alt="Company Logo" style="width: 120px; height: auto; margin-bottom: 15px;">
    <h1 style="color: #333333; margin: 0; font-size: 24px;">Order Confirmation</h1>
  </header>

  <div style="text-align: center; padding: 30px 0;">
    <button style="width: 50px; height: 50px; background-color: #4CAF50; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 24px;">✓</button>
    <h2>Thank you for your order!</h2>
    <p>Mã order: #ORDER-${order.id}</p>
  </div>

  <div style="padding: 20px; background-color: #f9f9f9; border-radius: 6px; margin: 20px 0;">
    <h3>Chi tiết order</h3>
    <div>${`
      <div style="display: flex; padding: 15px; border-bottom: 1px solid #eee; cursor: pointer;">`
        + order.order_items.reduce((str, item) => str + `
          <img src="${item.product.image_url}" alt = "${item.product.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px; margin-right: 15px;" >
          <div style="flex: 1;">
            <h4>${item.product.name}</h4>
            <p>Số lượng: ${item.quantity}</p>
            <p>Tùy chọn: ${item.product_option.name}</p>
            <p style="color: #2196F3; font-weight: bold;">${formatNumberWithCommas(item.product_option.price)}</p>
          </div>
        `, '') + `
      </div>
    </div>   
    <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #eee;">
      <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #333;">
        <span>Tổng tiền:</span>
        <span>${formatNumberWithCommas(order.total_amount)}</span>
      </div>
    </div>
  </div>
    `}
  <div style="padding: 20px; background-color: #fff; border: 1px solid #eee; border-radius: 6px; margin: 20px 0;" >
    <h3>Chi tiết thanh toán</h3>
    <div style="margin: 5px 0;">
      <span>Phương thức thanh toán:</span>
      <span>Thanh toán tại quầy</span>
    </div>
    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
      <h4>Ngày hẹn gặp:</h4>
      <p>${new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN')}</p>
    </div>
  </div>
  <footer style="text-align: center; padding: 20px; border-top: 2px solid #f0f0f0; margin-top: 20px;">
    <p>Cần trợ giúp? Hãy liên hệ ngay</p>
    <div style="display: flex; justify-content: center; gap: 20px; margin-top: 10px;">
      <span>Email: ${contact_information.email}</span>
      <span>Phone: ${contact_information.phone}</span>
    </div>
  </footer>
</div >
      `,
    });
  }

  sendSuccessVNPAYPaymentOrderEmail = async ({ email, order }) => {
    await sendEmail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Xác nhận thanh toán thành công qua VNPAY',
      html: `
  <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #ffffff; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); border-radius: 8px;">
    <header style="text-align: center; padding: 20px 0; border-bottom: 2px solid #f0f0f0;">
      <img src="${logos.company_logo}" alt="Company Logo" style="width: 120px; height: auto; margin-bottom: 15px;">
      <h1 style="color: #333333; margin: 0; font-size: 24px;">Thanh toán thành công</h1>
    </header>
  
    <div style="text-align: center; padding: 30px 0;">
      <div style="width: 50px; height: 50px; background-color: #4CAF50; color: white; border-radius: 50%; display: flex; margin: 0 auto 15px; font-size: 24px; align-items: center; justify-content: center;">✓</div>
      <h2>Cảm ơn bạn đã hoàn tất thanh toán qua VNPAY!</h2>
      <p>Mã order: #ORDER-${order.id}</p>
    </div>
  
    <div style="padding: 20px; background-color: #f9f9f9; border-radius: 6px; margin: 20px 0;">
      <h3>Chi tiết đơn hàng</h3>
      <div>
        <div style="display: flex; padding: 15px; border-bottom: 1px solid #eee; cursor: pointer;">`
        + order.order_items.reduce((str, item) => str + `
            <img src="${item.product.image_url}" alt="${item.product.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px; margin-right: 15px;">
            <div style="flex: 1;">
              <h4>${item.product.name}</h4>
              <p>Số lượng: ${item.quantity}</p>
              <p>Tùy chọn: ${item.product_option.name}</p>
              <p style="color: #2196F3; font-weight: bold;">${formatNumberWithCommas(item.product_option.price)} ${order.currency}</p>
            </div>
          `, '') + `
        </div>
      </div>   
      <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #eee;">
        <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #333;">
          <span>Tổng tiền:</span>
          <span>${formatNumberWithCommas(order.total_amount)} ${order.currency}</span>
        </div>
      </div>
    </div>
    
    <div style="padding: 20px; background-color: #fff; border: 1px solid #eee; border-radius: 6px; margin: 20px 0;">
      <h3>Chi tiết thanh toán</h3>
      <div style="margin: 5px 0;">
        <span>Phương thức thanh toán:</span>
        <span>VNPAY</span>
      </div>
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
        <h4>Ngày thanh toán:</h4>
        <p>${new Date().toLocaleDateString('vi-VN')}</p>
        <p>Số tiền: ${formatNumberWithCommas(order.total_amount)} ${order.currency}</p>
      </div>
    </div>
    
    <footer style="text-align: center; padding: 20px; border-top: 2px solid #f0f0f0; margin-top: 20px;">
      <p>Cần trợ giúp? Hãy liên hệ ngay</p>
      <div style="display: flex; justify-content: center; gap: 20px; margin-top: 10px;">
        <p>Email: ${contact_information.email}</p>
        <p>Phone: ${contact_information.phone}</p>
      </div>
    </footer>
  </div>
      `,
    });
  };
}
