import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserService } from "../services";
import EmailService from '../services/email.service';
import fs from 'fs';
import { account_roles } from '../constants/constants';
import { OTPService } from "../services/OTPService"; 
import { SMSService } from "../services/SMSService"; 


export default class AuthController {

    googleLogin = async (req, res) => {
        const { accessToken } = req.body;
        if (!accessToken) {
          return res.status(400).json({ message: "Access token của Google là bắt buộc" });
        }
        try {
          // Xác thực accessToken thông qua endpoint của Google
          const googleResponse = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`);
          if (!googleResponse.ok) {
            return res.status(400).json({ message: "Access token của Google không hợp lệ" });
          }
          const googleData = await googleResponse.json();
          
          // Kiểm tra email đã được xác thực trên Google chưa
          if (googleData.email_verified !== "true" && googleData.email_verified !== true) {
            return res.status(400).json({ message: "Email Google chưa được xác thực" });
          }
          
          const { email, name, picture } = googleData;
          
          // Tìm kiếm user trong hệ thống dựa trên email
          let user = await new UserService().getUserInfoByEmail(email);
          if (!user) {
            // Nếu user chưa tồn tại, tạo mới với thông tin từ Google
            const newUserData = {
              email,
              first_name: name.split(" ")[0],
              last_name: name.split(" ").slice(1).join(" ") || "",
              role: account_roles.USER,
              // Bạn có thể lưu thêm thông tin như picture nếu cần
            };
            user = await new UserService().createUser(newUserData);
          }
          
          // Tạo token của hệ thống cho user
          const access_token = jwt.sign(
            { email: user.email, id: user.id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: '1h' }
          );
          const refresh_token = jwt.sign(
            { email: user.email, id: user.id, role: user.role },
            process.env.REFRESH_TOKEN_SECRET_KEY,
            { expiresIn: '1d' }
          );
          
          return res.status(200).json({ message: "Đăng nhập Google thành công", user, access_token, refresh_token });
        } catch (error) {
          console.error("Google login error:", error);
          return res.status(500).json({ message: "Lỗi máy chủ", error });
        }
      }

    sendOTPRegistration = async (req, res) => {
        const { phone, password, first_name, last_name, birth, role } = req.body;
        if (!phone || !password || !first_name || !last_name) {
          return res.status(400).json({ message: "Vui lòng nhập các trường bắt buộc" });
        }
    
        try {
          // Kiểm tra nếu số điện thoại đã được xác thực (đã có user trong hệ thống)
          const userExist = await new UserService().getUserInfoByPhone(phone);
          if (userExist) {
            return res.status(400).json({ message: "Số điện thoại đã được xác thực" });
          }
    
          // Tạo OTP 6 chữ số
          const otp = Math.floor(100000 + Math.random() * 900000).toString();
          // Thiết lập thời gian hết hạn cho OTP (ví dụ: 10 phút)
          const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    
          // Lưu thông tin OTP cùng dữ liệu đăng ký tạm thời
          await new OTPService().saveOTP({
            phone,
            otp,
            expiresAt,
            password,
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            birth: birth || null,
            role: role || "USER"
          });
    
          // Gửi OTP qua SMS sử dụng SMSService
          await new SMSService().sendOTP({ phone, otp });
    
          return res.status(200).json({ message: "OTP đã được gửi đến số điện thoại của bạn" });
        } catch (error) {
          console.error("Lỗi gửi OTP:", error);
          return res.status(500).json({ message: "Lỗi máy chủ", error });
        }
      };
    
      /**
       * Endpoint gửi lại OTP chỉ dựa vào số điện thoại.
       * Yêu cầu: phone.
       */
      resendOTP = async (req, res) => {
        const { phone } = req.body;
        if (!phone) {
          return res.status(400).json({ message: "Vui lòng nhập số điện thoại" });
        }
        try {
          // Tạo OTP 6 chữ số mới
          const otp = Math.floor(100000 + Math.random() * 900000).toString();
          const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
          
          // Lưu (hoặc cập nhật) OTP mới cho số điện thoại
          await new OTPService().saveOTP({
            phone,
            otp,
            expiresAt,
            // Trong trường hợp gửi lại OTP, các thông tin đăng ký khác không bắt buộc
            password: null,
            first_name: null,
            last_name: null,
            birth: null,
            role: null
          });
          
          // Gửi OTP qua SMS
          await new SMSService().sendOTP({ phone, otp });
          
          return res.status(200).json({ message: "OTP đã được gửi lại đến số điện thoại của bạn" });
        } catch (error) {
          console.error("Lỗi gửi lại OTP:", error);
          return res.status(500).json({ message: "Lỗi máy chủ", error });
        }
      };
    
      /**
       * Endpoint xác thực số điện thoại bằng OTP.
       * Yêu cầu: phone, otp.
       */
      verifyPhone = async (req, res) => {
        const { phone, otp } = req.body;
        if (!phone || !otp) {
          return res.status(400).json({ message: "Số điện thoại và OTP là bắt buộc" });
        }
    
        try {
          // Lấy bản ghi OTP theo số điện thoại
          const otpRecord = await new OTPService().getOTPByPhone(phone);
          if (!otpRecord) {
            return res.status(400).json({ message: "OTP không tồn tại hoặc đã hết hạn" });
          }
    
          // Kiểm tra OTP có khớp không
          if (otpRecord.otp !== otp) {
            return res.status(400).json({ message: "OTP không chính xác" });
          }
    
          // Kiểm tra thời gian hết hạn của OTP
          if (new Date() > otpRecord.expiresAt) {
            return res.status(400).json({ message: "OTP đã hết hạn" });
          }
    
          // Tạo tài khoản người dùng với các thông tin đã lưu trong bản ghi OTP
          const newUser = await new UserService().createUser({
            phone: otpRecord.phone,
            password: otpRecord.password,
            first_name: otpRecord.first_name,
            last_name: otpRecord.last_name,
            birth: otpRecord.birth,
            role: otpRecord.role
          });
    
          // Sau khi xác thực thành công, xoá bản ghi OTP
          await new OTPService().deleteOTP(phone);
    
          return res.status(201).json({ message: "Số điện thoại đã được xác thực thành công", user: newUser });
        } catch (error) {
          console.error("Lỗi xác thực số điện thoại:", error);
          return res.status(400).json({ message: "Xác thực thất bại", error });
        }
      };

    getPublicKey = (req, res) => {
        let path = require('path');
        const publicKey = fs.readFileSync(path.resolve(__dirname, '../keys/public.key'), 'utf8');
        res.send(publicKey);
    }


    // Phương thức đăng ký sử dụng OTP (đã gửi OTP qua email)
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
  
      // Tạo OTP 6 chữ số
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
      // Lưu thông tin đăng ký tạm thời cùng OTP (cho demo; production nên dùng Redis hoặc DB)
      global.registerOtpStore = global.registerOtpStore || {};
      global.registerOtpStore[email] = {
        otp,
        expires: Date.now() + 5 * 60 * 1000, // OTP có hiệu lực 5 phút
        registrationData: {
          email,
          password, // Bạn nên mã hóa password trước khi lưu
          first_name: first_name.trim(),
          last_name: last_name.trim(),
          phone,
          birth,
          role: account_roles.USER,
        },
      };
  
      // Gửi OTP về email người dùng
      await new EmailService().sendRegisterEmailOtp({ email, otp });
  
      return res.status(200).json({ message: "Mã OTP xác thực đã được gửi đến email của bạn" });
    } catch (error) {
      console.error("Error in registerUser:", error);
      return res.status(500).json({ message: "Lỗi máy chủ", error });
    }
  };
  
    // Endpoint xác thực OTP đăng ký
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
  
      // Nếu OTP hợp lệ, tiến hành tạo tài khoản
      const registrationData = record.registrationData;
      const createdUser = await new UserService().createUser(registrationData);
  
      // Xóa OTP sau khi xác thực thành công
      delete global.registerOtpStore[email];
  
      return res.status(200).json({ message: "Đăng ký thành công", user: createdUser });
    };



    
    loginUser = async (req, res) => {
        const { email, password } = req.body;

        if (
            !email ||
            !password
        ) {
            return res.status(400).json({ message: "Email và mật khẩu là bắt buộc" });
        }

        try {
            const user = await new UserService().getUserInfoByEmail(email);
            if (
                !user ||
                !(await new UserService().compareUserPassword(password, user.hashed_password))
            ) {
                return res.status(400).json({ message: "Email hoặc mật khẩu không chính xác" });
            }

            const access_token = jwt.sign(
                { email: user.email, id: user.id, role: user.role },
                process.env.ACCESS_TOKEN_SECRET_KEY,
                { expiresIn: '1h' }
            );
            const refresh_token = jwt.sign(
                { email: user.email, id: user.id, role: user.role },
                process.env.REFRESH_TOKEN_SECRET_KEY,
                { expiresIn: '1d' }
            );

            return res.status(200).json({ message: "Đăng nhập thành công", user, access_token, refresh_token });
        } catch (err) {
            return res.status(500).json({ message: "Lỗi máy chủ", error: err });
        }
    }

    verifyEmail = async (req, res) => {
        const token = req.params.token;
        if (!token) {
            return res.status(400).json({ message: "Token là bắt buộc" });
        }

        try {
            const decoded = jwt.verify(token, process.env.REGISTER_SECRET_KEY);
            const userExist = await new UserService().getUserInfoByEmail(decoded.email);

            if (userExist) {
                return res.status(400).json({ message: "Email đã được xác thực, đường dẫn này đã hết hạn" });
            }

            const newUser = await new UserService().createUser({
                email: decoded.email,
                password: decoded.password,
                first_name: decoded.first_name,
                last_name: decoded.last_name,
                phone: decoded.phone,
                birth: decoded.birth,
                role: decoded.role
            });

            return res.status(201).json({ message: "Email xác thực thành công", user: newUser });
        } catch (error) {
            return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn", error });
        }
    }

    async requestPasswordReset(req, res) {
      try {
        const { email } = req.body;
        if (!email) {
          return res.status(400).json({ message: "Email là bắt buộc" });
        }
    
        const userService = new UserService();
        const user = await userService.getUserInfoByEmail(email);
        if (!user) {
          return res.status(404).json({ message: "Không tìm thấy email" });
        }
    
        // Tạo OTP 6 chữ số
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
        // Lưu OTP tạm thời vào biến toàn cục (cho demo; production nên dùng Redis hoặc DB)
        global.forgotPasswordOtpStore = global.forgotPasswordOtpStore || {};
        global.forgotPasswordOtpStore[email] = {
          otp,
          expires: Date.now() + 5 * 60 * 1000, // OTP có hiệu lực 5 phút
        };
    
        // Gửi OTP qua email
        const emailService = new EmailService();
        await emailService.sendResetPasswordOTP({ email, otp });
    
        return res.status(200).json({ message: "Mã OTP đã được gửi đến email của bạn" });
      } catch (error) {
        console.error("Error in requestPasswordReset:", error);
        return res.status(500).json({ message: "Lỗi máy chủ", error });
      }
    }
    
    // Hàm xác thực OTP khi người dùng nhập từ FE
    async verifyResetOTP(req, res) {
      try {
        const { email, otp } = req.body;
        if (!email || !otp) {
          return res.status(400).json({ message: "Email và OTP là bắt buộc" });
        }
    
        // Lấy thông tin OTP đã lưu từ biến toàn cục
        global.forgotPasswordOtpStore = global.forgotPasswordOtpStore || {};
        const storedRecord = global.forgotPasswordOtpStore[email];
    
        if (!storedRecord) {
          return res.status(400).json({ message: "OTP không tồn tại hoặc đã hết hạn" });
        }
    
        // Kiểm tra thời gian hiệu lực
        if (Date.now() > storedRecord.expires) {
          delete global.forgotPasswordOtpStore[email];
          return res.status(400).json({ message: "OTP đã hết hạn" });
        }
    
        // Kiểm tra OTP có khớp không
        if (storedRecord.otp !== otp) {
          return res.status(400).json({ message: "OTP không hợp lệ" });
        }
    
        // Nếu OTP hợp lệ, xóa OTP khỏi store (để không lặp lại)
        delete global.forgotPasswordOtpStore[email];
    
        // Ở đây bạn có thể chuyển hướng FE sang màn hình đặt lại mật khẩu
        // Hoặc trả về một mã thông báo để cho phép FE gọi endpoint resetPassword
        return res.status(200).json({ message: "OTP xác thực thành công" });
      } catch (error) {
        console.error("Error in verifyResetOTP:", error);
        return res.status(500).json({ message: "Lỗi máy chủ" });
      }
    }
    
    
    async resetPassword(req, res) {
      try {
        const { email, newPassword } = req.body;
        if (!email || !newPassword) {
          return res.status(400).json({ message: "Email và mật khẩu mới là bắt buộc" });
        }
    
        const userService = new UserService();
        const user = await userService.getUserInfoByEmail(email);
        if (!user) {
          return res.status(404).json({ message: "Không tìm thấy email" });
        }
    
        // Cập nhật mật khẩu mới (hãy nhớ hash mật khẩu trước khi lưu nếu cần)
        const updatedUser = await userService.updateUserPassword({ email, password: newPassword });
        return res.status(200).json({ message: "Mật khẩu đã được thay đổi thành công", user: updatedUser });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi máy chủ" });
      }
    }
    
    

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

            const updatedUser = await new UserService().updateUserPassword({ email: decoded.email, password });
            return res.status(200).json({ message: "Mật khẩu đã được thay đổi thành công", user: updatedUser });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
        }
    }

    refreshAccessToken = async (req, res) => {
        let { refresh_token } = req.body;
        if (!refresh_token) {
            console.log("Refresh token là bắt buộc");
            return res.status(400).json({ message: "Refresh token là bắt buộc" });
        }

        try {
            const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET_KEY);
            if (!decoded.email) {
                console.log("Token không hợp lệ");
                return res.status(400).json({ message: "Token không hợp lệ" });
            }
            const user = await new UserService().getUserInfoByEmail(decoded.email);

            if (!user) {
                return res.status(404).json({ message: "Không tìm thấy người dùng" });
            }

            const access_token = jwt.sign({ email: user.email, id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '1h' });
            refresh_token = jwt.sign({ email: user.email, id: user.id, role: user.role }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1d' });

            return res.status(200).json({ message: "Refresh token thành công", user, access_token, refresh_token });
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn", error });
        }
    }

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
    }

    checkToken = async (req, res) => {
        const authorization = req.body.token;
        const token = authorization && authorization.split(' ')[1];
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
    }}