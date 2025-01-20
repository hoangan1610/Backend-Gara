import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserService } from "../services";
import EmailService from '../services/email.service';
import fs from 'fs';
import { account_roles } from '../constants/constants';

export default class AuthController {

    getPublicKey = (req, res) => {
        let path = require('path');
        const publicKey = fs.readFileSync(path.resolve(__dirname, '../keys/public.key'), 'utf8');
        res.send(publicKey);
    }

    registerUser = async (req, res) => {
        const { email, password, first_name, last_name, phone, birth } = req.body;

        if (
            !email ||
            !password ||
            !first_name ||
            !last_name
        ) {
            return res.status(400).json({ message: "Vui lòng nhập các trường bắt buộc" });
        }

        try {
            const userExist = await new UserService().getUserInfoByEmail(email);
            if (userExist) {
                return res.status(400).json({ message: "Email đã tồn tại" });
            }

            const token = jwt.sign(
                { email, password, first_name: first_name.trim(), last_name: last_name.trim(), phone, birth, role: account_roles.USER },
                process.env.REGISTER_SECRET_KEY,
                { expiresIn: '24h' }
            );

            await new EmailService().sendRegisterEmail({ email, token });

            return res.status(200).json({ message: "Email xác thực đã được gửi" });
        } catch (error) {
            return res.status(500).json({ message: "Lỗi máy chủ", error });
        }
    }

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

    requestPasswordReset = async (req, res) => {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: "Email là bắt buộc" });
            }

            const user = await new UserService().getUserInfoByEmail(email);
            if (!user) {
                return res.status(404).json({ message: "Không tìm thấy email" });
            }

            const token = jwt.sign({ email, old_password: user.hashed_password }, process.env.RESET_PASSWORD_SECRET_KEY, { expiresIn: '5m' });
            await new EmailService().sendResetPasswordEmail({ email, token });

            return res.status(200).json({ message: "Email đặt lại mật khẩu đã được gửi" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Lỗi máy chủ" });
        }
    }

    resetPassword = async (req, res) => {
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
    }
}