import express from "express";
import { AuthController } from "../controllers";

const authAPI = express.Router();

const authAPIRoute = (app) => {
  authAPI.get("/public-key", new AuthController().getPublicKey);
  authAPI.post("/login", new AuthController().loginUser);
  authAPI.post("/regist", new AuthController().registerUser);
  authAPI.get("/verify-email/:token", new AuthController().verifyEmail);
  authAPI.post("/request-reset-password", new AuthController().requestPasswordReset);
  authAPI.post("/reset-password", new AuthController().resetPassword);
  authAPI.post("/verify-reset-otp", new AuthController().verifyResetOTP);

  authAPI.post("/refresh-token", new AuthController().refreshAccessToken);
  authAPI.post("/check-email", new AuthController().checkEmail);
  authAPI.post("/check-token", new AuthController().checkToken);

  // Endpoint OTP đăng ký và các endpoint OTP khác
  authAPI.post("/verify-register-otp", new AuthController().verifyRegisterOtp);
  authAPI.post("/send-otp", new AuthController().sendOTPRegistration);
  authAPI.post("/resend-otp", new AuthController().resendOTP);
  authAPI.post("/verify-phone", new AuthController().verifyPhone);

  // Endpoint đăng nhập Google
  authAPI.post("/google-login", new AuthController().googleLogin);

  return app.use("/api/v1/auth", authAPI);
}

export default authAPIRoute;
