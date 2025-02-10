import express from "express";
import {
    AuthController,
    UserController
} from "../controllers";

let authAPI = express.Router();

let authAPIRoute = (app) => {
    authAPI.get("/public-key", new AuthController().getPublicKey);
    authAPI.post("/login", new AuthController().loginUser);
    authAPI.post("/regist", new AuthController().registerUser);
    authAPI.get("/verify-email/:token", new AuthController().verifyEmail);
    authAPI.post("/request-reset-password", new AuthController().requestPasswordReset);
    authAPI.post("/reset-password", new AuthController().resetPassword);
    authAPI.post("/refresh-token", new AuthController().refreshAccessToken);
    authAPI.post("/check-email", new AuthController().checkEmail);
    authAPI.post("/check-token", new AuthController().checkToken);

      // Endpoint đăng ký ban đầu gửi OTP
  authAPI.post("/send-otp", new AuthController().sendOTPRegistration);
  // Endpoint gửi lại OTP chỉ dựa vào số điện thoại
  authAPI.post("/resend-otp", new AuthController().resendOTP);
  // Endpoint xác thực số điện thoại
  authAPI.post("/verify-phone", new AuthController().verifyPhone);

    return app.use("/api/v1/auth", authAPI);
}

export default authAPIRoute;
