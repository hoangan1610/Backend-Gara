import express from "express";
import {
  CategoryController,
  CostController,
  OrderController,
  ProductController,
  PublicController,
  UserController
} from "../controllers";

let adminApi = express.Router();

let adminApiRoute = (app) => {
  adminApi.get("/user", new UserController().getAll);
  adminApi.post("/user", new UserController().create);
  adminApi.get("/user/query", new UserController().query);
  adminApi.get("/user/:id", new UserController().getOne);
  adminApi.put("/user/:id", new UserController().update);
  adminApi.delete("/user/:id", new UserController().delete);

  adminApi.get("/product", new ProductController().getAll);
  adminApi.get("/product/:id", new ProductController().getOne);
  adminApi.post("/product", new ProductController().create);
  adminApi.get("/product/query", new ProductController().query);
  adminApi.put("/product/:id", new ProductController().update);
  adminApi.delete("/product/:id", new ProductController().delete);

  adminApi.get("/category", new CategoryController().getAll);
  adminApi.post("/category", new CategoryController().create);
  adminApi.put("/category/:id", new CategoryController().update);
  adminApi.delete("/category/:id", new CategoryController().delete);

  adminApi.get("/order", new OrderController().getAll);
  adminApi.post("/order", new OrderController().create);
  adminApi.put("/order/:id", new OrderController().update);
  adminApi.delete("/order/:id", new OrderController().delete);

  adminApi.post("/product_option", new ProductController().createOption);
  adminApi.put("/product_option/:id", new ProductController().updateOption);
  adminApi.delete("/product_option/:id", new ProductController().deleteOption);

  adminApi.get("/cost", new CostController().getAll);

  adminApi.get("/weekly-orders", new OrderController().getWeeklyOrders);

  adminApi.get("/monthly-revenue", new OrderController().getMonthlyRevenue);
  adminApi.get("/yearly-revenue", new OrderController().getYearlyRevenue);
  adminApi.get("/revenue", new OrderController().getRevenue);

  adminApi.get("/promotion", new PublicController().getPromotions);
  adminApi.put("/promotion", new PublicController().updatePromotions);

  adminApi.get("/policies", new PublicController().getPolicies);
  adminApi.put("/policies", new PublicController().updatePolicies);

  adminApi.get("/analytics", new PublicController().getAnalytics);

  return app.use("/api/v1/admin", adminApi);
}

export default adminApiRoute;
