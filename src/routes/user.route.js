import express from "express";
import { UserController } from "../controllers";

let userAPI = express.Router();

let userAPIRoute = (app) => {
  userAPI.get("/get-user-info", new UserController().getUserByToken);
  userAPI.get("/orders", new UserController().getOrders);
  userAPI.put("/update-info", new UserController().updateInfo);
  userAPI.put("/order/:id/cancel", new UserController().cancelOrder);

  // Các endpoint OTP cho việc cập nhật profile
  userAPI.post("/send-update-otp", new UserController().sendUpdateOtp);
  userAPI.post("/verify-update-otp", new UserController().verifyUpdateOtp);

  return app.use("/api/v1/user", userAPI);
}

export default userAPIRoute;
