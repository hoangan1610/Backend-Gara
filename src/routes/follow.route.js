import express from "express";
import { ProductController } from "../controllers";

let route = express.Router();

let followRoute = (app) => {
  route.get("/", new ProductController().getFollow);
  route.post("/follow", new ProductController().follow);
  route.post("/unfollow", new ProductController().unfollow);
  route.post("/sync-follow", new ProductController().syncFollow);

  return app.use("/api/v1/follow", route);
}

export default followRoute;
