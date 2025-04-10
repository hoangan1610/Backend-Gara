// routes/order.route.js
import express from "express";
import { OrderController } from "../controllers";

const route = express.Router();

const orderRoute = (app) => {
let route = express.Router();

let orderRoute = (app) => {
  const controller = new OrderController();

  route.get("/", controller.getAllByUser);
  route.post("/", controller.createOrder);
  route.get("/empty", controller.getEmptyOrder);
  route.get('/:orderId/items', controller.getOrderDetailsByUser);
  route.put('/:orderId/cancel', controller.cancelOrder);
  route.get("/:id", controller.getById);
  route.post("/add/:id", controller.addOrderItem);
  route.put("/update/:id", controller.updateOrderItem);
  route.post('/create-payment-url/vnpay', controller.createVNPayPaymentUrl);
  route.post('/confirm-payment/vnpay', controller.confirmVNPayPayment);

  // Endpoint kiểm tra mua sản phẩm
  route.get("/has-purchased/:productId", controller.hasPurchasedProduct);

  return app.use("/api/v1/order", route);
  };
}

export default orderRoute;
