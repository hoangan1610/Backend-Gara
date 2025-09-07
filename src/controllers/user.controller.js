import jwt from 'jsonwebtoken';
import db from '../models';
import { CartService, OrderService, UserService } from '../services';
import { account_roles, order_status, payment_method_codes } from '../constants/constants';
import EmailService from '../services/email.service';

const role_author_number = {
    [account_roles.NO_ROLE]: 0,
    [account_roles.USER]: 1,
    [account_roles.EMPLOYEE]: 1,
    [account_roles.ADMIN]: 2,
    [account_roles.SUPER_ADMIN]: 3,
}
const canCreate = (req_role, user_role) => {
    return role_author_number[req_role] > role_author_number[user_role];
}
const canRead = (req_role, user_role) => {
    return role_author_number[req_role] >= role_author_number[user_role];
}
const canUpdate = (req_role, user_role) => {
    return role_author_number[req_role] > role_author_number[user_role];
}
const canDelete = (req_role, user_role) => {
    return role_author_number[req_role] > role_author_number[user_role];
}
export default class UserController {


    sendUpdateOtp = async (req, res) => {
        try {
          let { email } = req.body;
          if (!email) {
            return res.status(400).json({ message: "Email là bắt buộc" });
          }
          // Chuẩn hóa email
          email = email.trim().toLowerCase();
    
          // Tạo OTP 6 chữ số
          const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
          // Lưu thông tin OTP tạm thời (cho demo; production nên dùng Redis hoặc DB)
          global.updateOtpStore = global.updateOtpStore || {};
          global.updateOtpStore[email] = {
            otp,
            expires: Date.now() + 5 * 60 * 1000, // OTP có hiệu lực 5 phút
            verified: false,
          };
    
          // Gửi OTP về email người dùng (EmailService cần có phương thức sendResetPasswordOTP)
          await new EmailService().sendResetPasswordOTP({ email, otp });
    
          return res.status(200).json({ message: "Mã OTP xác thực đã được gửi đến email của bạn" });
        } catch (error) {
          console.error("Error in sendUpdateOtp:", error);
          return res.status(500).json({ message: "Lỗi máy chủ", error });
        }
      };
    
      // Endpoint xác thực OTP cập nhật email
      verifyUpdateOtp = async (req, res) => {
        try {
          let { email, otp } = req.body;
          if (!email || !otp) {
            return res.status(400).json({ message: "Email và OTP là bắt buộc" });
          }
          // Chuẩn hóa email
          email = email.trim().toLowerCase();
    
          global.updateOtpStore = global.updateOtpStore || {};
          const record = global.updateOtpStore[email];
          if (!record) {
            return res.status(400).json({ message: "OTP không tồn tại hoặc đã hết hạn" });
          }
          if (Date.now() > record.expires) {
            delete global.updateOtpStore[email];
            return res.status(400).json({ message: "OTP đã hết hạn" });
          }
          if (record.otp !== otp) {
            return res.status(400).json({ message: "OTP không hợp lệ" });
          }
          // Đánh dấu OTP đã xác thực nhưng không xoá ngay
          record.verified = true;
          return res.status(200).json({ message: "OTP xác thực thành công" });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Lỗi máy chủ" });
        }
      };
      
      
  
      async updateInfo(req, res) {
        try {
          if (!req.body) {
            return res.status(400).json({ message: "Missing user info" });
          }
          if (!req.body.id) {
            return res.status(400).json({ message: "Missing user id" });
          }
          const { id, ...formData } = req.body;
          if (req.user?.id != id) {
            return res.status(403).json({ message: "You don't have permission to edit this user" });
          }
          
          // Nếu có cập nhật email mới và email mới khác với email hiện tại,
          // chuyển email về dạng chuẩn (trim, toLowerCase) để so sánh
          if (formData.email && formData.email.trim().toLowerCase() !== req.user.email.trim().toLowerCase()) {
            global.updateOtpStore = global.updateOtpStore || {};
            const normalizedEmail = formData.email.trim().toLowerCase();
            console.log("OTP Record for", normalizedEmail, ":", global.updateOtpStore[normalizedEmail]); // Debug log
            const otpRecord = global.updateOtpStore[normalizedEmail];
            if (!otpRecord || !otpRecord.verified) {
              return res.status(400).json({ message: "Email mới chưa được xác thực OTP" });
            }
            // Xóa record OTP sau khi xác thực thành công
            delete global.updateOtpStore[normalizedEmail];
          }
      
          // Nếu có cập nhật mật khẩu, xử lý việc xác thực mật khẩu cũ và mã hóa mật khẩu mới
          if (formData.password) {
            if (formData.password.length < 8) {
              return res.status(400).json({ message: "Password must be at least 8 characters" });
            }
            let user = await new UserService().getOne({ where: { id } });
            let old_password_match = await new UserService().compareUserPassword(formData.old_password, user.hashed_password);
            if (!old_password_match) {
              return res.status(400).json({ message: "Old password is incorrect" });
            }
            formData.hashed_password = await new UserService().hashUserPassword(formData.password);
            delete formData.password;
            delete formData.old_password;
          }
          
          // Cập nhật thông tin người dùng với dữ liệu mới (bao gồm email mới nếu có)
          await new UserService().update({ id, ...formData });
          return res.status(200).json({ message: "Update successfully" });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal server error" });
        }
      }
      
  

    async cancelOrder(req, res) {
        try {
            const order = await new OrderService().getOne({ where: { id: req.params.id } });
            if (!order) {
                return res.status(404).json({ message: "Not found" });
            }
            if (order.status !== order_status.PENDING) {
                return res.status(400).json({ message: "Order is not pending" });
            }
            if (order.payment_method !== payment_method_codes.COD) {
                return res.status(400).json({ message: "Can't cancel this order" });
            }
            if (order.user_id !== req.user.id) {
                return res.status(403).json({ message: "You don't have permission to cancel this order" });
            }
            const data = await new OrderService().update({ id: req.params.id, status: order_status.CANCELLED });

            let updatedOrder = await new OrderService().getOne({
                where: { id: req.params.id },
                include: [
                    {
                        model: db.order_item,
                        include: [
                            { model: db.product }
                        ]
                    }
                ]
            });

            return res.status(200).json({ message: "Cancel order successfully", order: updatedOrder });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getUserByToken(req, res) {
        try {
          const token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
          const user = await new UserService().getFullUserInfoById(decoded.id);
          return res.status(200).json(user);
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: error.message });
        }
      }
      

    async getOrders(req, res) {
        try {
            const orders = await new OrderService().getAll({
                where: { user_id: req.user.id },
                include: [
                    {
                        model: db.order_item,
                        include: [
                            { model: db.product }
                        ]
                    }
                ]
            });
            return res.status(200).json({ orders });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const data = await new UserService().getAll();
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async query(req, res) {
        try {
            let query = req.query;

            let data = await new UserService().query(query);

            return res.status(200).json({ users: data });
        }
        catch (error) {
            // console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getOne(req, res) {
        try {
            const data = await new UserService().getOne({ where: { id: req.params.id } });
            if (!data) {
                return res.status(404).json({ message: "Not found" });
            }
            return res.status(200).json(data);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async create(req, res) {
        try {
            if (!canCreate(req.user?.role || account_roles.NO_ROLE, req.body.role)) {
                return res.status(403).json({ message: "You don't have permission to create this user" });
            }

            let { password, ...formData } = req.body;
            formData.hashed_password = await new UserService().hashUserPassword(password);
            const data = await new UserService().create(formData);
            return res.status(201).json({ user: data, message: "Create successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async update(req, res) {
        try {
            const target_user = await new UserService().getOne({ where: { id: req.params.id } });
            if (!target_user) {
                return res.status(404).json({ message: "Not found" });
            }

            console.log(req.user.id, req.body.id, req.user?.role, target_user.role);
            if (req.user.id != req.body.id && !canUpdate(req.user?.role || account_roles.NO_ROLE, target_user.role)) {
                return res.status(403).json({ message: "You don't have permission to edit this user" });
            }

            let { password, ...formData } = req.body;
            if (password) {
                formData.hashed_password = await new UserService().hashUserPassword(password);
            }

            let data = await new UserService().update(formData);

            if (data) {
                data = await new UserService().getOne({
                    where: { id: req.body.id }
                });
            } else {
                return res.status(404).json({ message: "Not found" });
            }
            return res.status(200).json({ user: data, message: "Update successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async delete(req, res) {
        try {
            const target_user = await new UserService().getOne({ where: { id: req.params.id } });
            if (!target_user) {
                return res.status(404).json({ message: "Not found" });
            }
            if (!canDelete(req.user?.role || account_roles.NO_ROLE, target_user.role) && req.user.id !== req.params.id) {
                return res.status(403).json({ message: "You don't have permission to delete this user" });
            }

            let data = await new UserService().delete({ where: { id: req.params.id } });
            return res.status(200).json({ message: "Delete successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}
