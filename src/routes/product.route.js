import express from "express";
import { ProductController } from "../controllers";

let route = express.Router();

let productRoute = (app) => {
    route.get("/", new ProductController().getAll);
    route.get("/detail/:path", new ProductController().getByPath);
    route.get("/search", new ProductController().search);

    return app.use("/api/v1/product", route);
}

export default productRoute;
