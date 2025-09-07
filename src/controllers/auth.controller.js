import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import { UserService } from "../services";
import EmailService from '../services/email.service';
import { account_roles } from '../constants/constants';
import { OTPService } from "../services/OTPService";
import { SMSService } from "../services/SMSService";

export default class AuthController {
  // Đăng nhập bằng Google
  googleLogin = async (req, res) => {
    const { accessToken } = req.body;
    if (!accessToken) {
      return res.status(400).json({ message: "Access token của Google là bắt buộc" });
    }
    try {
      const googleResponse = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
      );
      if (!googleResponse.ok) {
        return res.status(400).json({ message: "Access token của Google không hợp lệ" });
      }
      const googleData = await googleResponse.json();

      if (googleData.email_verified !== "true" && googleData.email_verified !== true) {
        return res.status(400).json({ message: "Email Google chưa được xác thực" });
      }

      const { email, name } = googleData;
      let user = await new UserService().getUserInfoByEmail(email);

      if (!user) {
        const newUserData = {
          email,
          first_name: name.split(" ")[0],
          last_name: name.split(" ").slice(1).join(" ") || "",
          role: account_roles.USER,
        };
        user = await new UserService().createUser(newUserData);
      }

      const access_token = jwt.sign(
        { email: user.email, id: user.id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "1h" }
      );
      const refresh_token = jwt.sign(
        { email: user.email, id: user.id, role: user.role },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: "Đăng nhập Google thành công",
        user,
        access_token,
        refresh_token,
      });
    } catch (error) {
      console.error("Google login error:", error);
      return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
  };

  // Gửi OTP đăng ký qua SMS
  sendOTPRegistration = async (req, res) => {
    const { phone, password, first_name, last_name, birth, role } = req.body;
    if (!phone || !password || !first_name || !last_name) {
      return res.status(400).json({ message: "Vui lòng nhập các trường bắt buộc" });
    }

    try {
      const userExist = await new UserService().getUserInfoByPhone(phone);
      if (userExist) {
        return res.status(400).json({ message: "Số điện thoại đã được xác thực" });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await new OTPService().saveOTP({
        phone,
        otp,
        expiresAt,
        password,
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        birth: birth || null,
        role: role || "USER",
      });

      await new SMSService().sendOTP({ phone, otp });
      return res.status(200).json({ message: "OTP đã được gửi đến số điện thoại của bạn" });
    } catch (error) {
      console.error("Lỗi gửi OTP:", error);
      return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
  };

  // Gửi lại OTP
  resendOTP = async (req, res) => {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Vui lòng nhập số điện thoại" });
    }
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await new OTPService().saveOTP({
        phone,
        otp,
        expiresAt,
      });

      await new SMSService().sendOTP({ phone, otp });
      return res.status(200).json({ message: "OTP đã được gửi lại đến số điện thoại của bạn" });
    } catch (error) {
      console.error("Lỗi gửi lại OTP:", error);
      return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
  };

  // Xác thực OTP qua SMS
  verifyPhone = async (req, res) => {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      return res.status(400).json({ message: "Số điện thoại và OTP là bắt buộc" });
    }

    try {
      const otpRecord = await new OTPService().getOTPByPhone(phone);
      if (!otpRecord) {
        return res.status(400).json({ message: "OTP không tồn tại hoặc đã hết hạn" });
      }
      if (otpRecord.otp !== otp) {
        return res.status(400).json({ message: "OTP không chính xác" });
      }
      if (new Date() > otpRecord.expiresAt) {
        return res.status(400).json({ message: "OTP đã hết hạn" });
      }

      const newUser = await new UserService().createUser({
        phone: otpRecord.phone,
        password: otpRecord.password,
        first_name: otpRecord.first_name,
        last_name: otpRecord.last_name,
        birth: otpRecord.birth,
        role: otpRecord.role,
      });

      await new OTPService().deleteOTP(phone);
      return res.status(201).json({
        message: "Số điện thoại đã được xác thực thành công",
        user: newUser,
      });
    } catch (error) {
      console.error("Lỗi xác thực số điện thoại:", error);
      return res.status(400).json({ message: "Xác thực thất bại", error });
    }
  };

  // Lấy public key
  getPublicKey = (req, res) => {
    const path = require("path");
    const publicKey = fs.readFileSync(path.resolve(__dirname, "../keys/public.key"), "utf8");
    res.send(publicKey);
  };

  // Đăng ký bằng email + OTP
  registerUser = async (req, res) => {
    const { email, password, first_name, last_name, phone, birth } = req.body;

    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({ message: "Vui lòng nhập các trường bắt buộc" });
    }

    try {
      const userExist = await new UserService().getUserInfoByEmail(email);
      if (userExist) {
        return res.status(400).json({ message: "Email đã tồn tại" });
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedPassword = await bcrypt.hash(password, 10);

      global.registerOtpStore = global.registerOtpStore || {};
      global.registerOtpStore[email] = {
        otp,
        expires: Date.now() + 5 * 60 * 1000,
        registrationData: {
          email,
          password: hashedPassword,
          first_name: first_name.trim(),
          last_name: last_name.trim(),
          phone,
          birth,
          role: account_roles.USER,
        },
      };

      try {
        await new EmailService().sendRegisterEmailOtp({ email, otp });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        delete global.registerOtpStore[email];
        return res.status(500).json({ message: "Không thể gửi email xác thực. Vui lòng thử lại." });
      }

      const payload = { email };
      const token = jwt.sign(payload, process.env.RESET_PASSWORD_SECRET_KEY, { expiresIn: "15m" });

      return res.status(200).json({
        message: "Mã OTP xác thực đã được gửi đến email của bạn",
        token,
        success: true,
      });
    } catch (error) {
      console.error("Error in registerUser:", error);
      if (global.registerOtpStore && global.registerOtpStore[email]) {
        delete global.registerOtpStore[email];
      }
      return res.status(500).json({
        message: "Lỗi máy chủ. Vui lòng thử lại sau.",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  };

  // Xác thực OTP đăng ký
  verifyRegisterOtp = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email và OTP là bắt buộc" });
    }

    const record = global.registerOtpStore && global.registerOtpStore[email];
    if (!record) {
      return res.status(400).json({ message: "OTP không tồn tại hoặc đã hết hạn" });
    }
    if (Date.now() > record.expires) {
      delete global.registerOtpStore[email];
      return res.status(400).json({ message: "OTP đã hết hạn" });
    }
    if (record.otp !== otp) {
      return res.status(400).json({ message: "OTP không hợp lệ" });
    }

    const registrationData = record.registrationData;
    const createdUser = await new UserService().createUser(registrationData);

    delete global.registerOtpStore[email];
    const access_token = jwt.sign(
      { email: createdUser.email, id: createdUser.id, role: createdUser.role },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Đăng ký thành công",
      user: createdUser,
      token: access_token,
    });
  };

  // Đăng nhập
  loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email và mật khẩu là bắt buộc" });
    }

    try {
      const user = await new UserService().getUserInfoByEmail(email);
      if (!user || !(await new UserService().compareUserPassword(password, user.hashed_password))) {
        return res.status(400).json({ message: "Email hoặc mật khẩu không chính xác" });
      }

      const access_token = jwt.sign(
        { email: user.email, id: user.id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "1h" }
      );
      const refresh_token = jwt.sign(
        { email: user.email, id: user.id, role: user.role },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: "1d" }
      );

      return res.status(200).json({ message: "Đăng nhập thành công", user, access_token, refresh_token });
    } catch (err) {
      return res.status(500).json({ message: "Lỗi máy chủ", error: err });
    }
  };

  // Reset mật khẩu
  resetPassword2 = async (req, res) => {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ message: "Token và mật khẩu là bắt buộc" });
    }

    try {
      const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET_KEY);
      if (!decoded.email) {
        return res.status(400).json({ message: "Token không hợp lệ" });
      }

      const user = await new UserService().getUserInfoByEmail(decoded.email);
      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy email" });
      }

      if (decoded.old_password !== user.hashed_password) {
        return res.status(400).json({ message: "Token không hợp lệ" });
      }

      const updatedUser = await new UserService().updateUserPassword({
        email: decoded.email,
        password,
      });
      return res.status(200).json({ message: "Mật khẩu đã được thay đổi thành công", user: updatedUser });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
    }
  };

  // Refresh token
  refreshAccessToken = async (req, res) => {
    let { refresh_token } = req.body;
    if (!refresh_token) {
      return res.status(400).json({ message: "Refresh token là bắt buộc" });
    }

    try {
      const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET_KEY);
      if (!decoded.email) {
        return res.status(400).json({ message: "Token không hợp lệ" });
      }

      const user = await new UserService().getUserInfoByEmail(decoded.email);
      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }

      const access_token = jwt.sign(
        { email: user.email, id: user.id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: "1h" }
      );
      refresh_token = jwt.sign(
        { email: user.email, id: user.id, role: user.role },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: "Refresh token thành công",
        user,
        access_token,
        refresh_token,
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn", error });
    }
  };

  // Kiểm tra email tồn tại
  checkEmail = async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email là bắt buộc" });
    }

    try {
      const user = await new UserService().getUserInfoByEmail(email);
      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy email" });
      }
      return res.status(200).json({ message: "Email đã tồn tại" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Lỗi máy chủ" });
    }
  };

  // Kiểm tra access token
  checkToken = async (req, res) => {
    const authorization = req.body.token;
    const token = authorization && authorization.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "Token là bắt buộc" });
    }

    try {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
      return res.status(200).json({ message: "Token hợp lệ" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Token không hợp lệ" });
    }
  };
}
