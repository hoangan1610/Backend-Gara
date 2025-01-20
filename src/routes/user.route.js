import express from "express";
import {
  UserController
} from "../controllers";

let userAPI = express.Router();

let userAPIRoute = (app) => {
  userAPI.get("/get-user-info", new UserController().getUserByToken);
  userAPI.get("/orders", new UserController().getOrders);
  userAPI.put("/update-info", new UserController().updateInfo);
  userAPI.put("/order/:id/cancel", new UserController().cancelOrder);

  return app.use("/api/v1/user", userAPI);
}

export default userAPIRoute;
