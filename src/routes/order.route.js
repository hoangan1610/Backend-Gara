import express from "express";
import { OrderController } from "../controllers";

let route = express.Router();

let orderRoute = (app) => {
  const controller = new OrderController();

  route.get("/", controller.getAllByUser);
  route.post("/", controller.createOrder);
  route.get("/empty", controller.getEmptyOrder);
  route.get("/:id", controller.getById);
  route.post("/add/:id", controller.addOrderItem);
  route.put("/update/:id", controller.updateOrderItem);
  route.post('/create-payment-url/vnpay', controller.createVNPayPaymentUrl);
  route.post('/confirm-payment/vnpay', controller.confirmVNPayPayment);

  return app.use("/api/v1/order", route);
};

export default orderRoute;
