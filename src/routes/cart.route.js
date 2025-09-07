import e from "express";
import {
    CartController
}
    from "../controllers";

let cartAPI = e.Router();
let cartAPIRoute = (app) => {
    cartAPI.get("/", new CartController().getByUserInToken);
    cartAPI.delete("/:id", new CartController().delete);
    cartAPI.post("/add", new CartController().addProduct);
    cartAPI.put("/update/:id", new CartController().update);
    cartAPI.put("/cart-item/update/:id", new CartController().updateCartItem);
    cartAPI.delete("/cart-item/delete/:id", new CartController().deleteCartItem);
    cartAPI.post("/sync", new CartController().sync);

    return app.use("/api/v1/cart", cartAPI);
}

export default cartAPIRoute;