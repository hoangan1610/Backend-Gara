import authAPIRoute from "./auth.route";
import productRoute from "./product.route";
import cartAPIRoute from "./cart.route";
import categoryRoute from "./category.route";
import followRoute from "./follow.route";
import userAPIRoute from "./user.route";
import orderRoute from "./order.route";
import adminApiRoute from "./admin.route";
import apllyUploadRouter from "./upload.route";
import applyFileRoutes from "./file.route";
import publicAPIRoute from "./public.route";
import applyTaskRoute from "./task.route";
import taskAPIRoute from "./task.route";
import reviewAPIRoute from "./reviewRoute"; // Import thêm route review

export {
    authAPIRoute,
    productRoute,
    cartAPIRoute,
    categoryRoute,
    followRoute,
    userAPIRoute,
    orderRoute,
    adminApiRoute,
    apllyUploadRouter,
    applyFileRoutes,
    publicAPIRoute,
    applyTaskRoute,
    taskAPIRoute,
    reviewAPIRoute, // Xuất thêm
};

export const applyAllRoutes = (app) => {
    authAPIRoute(app);
    productRoute(app);
    cartAPIRoute(app);
    categoryRoute(app);
    followRoute(app);
    userAPIRoute(app);
    orderRoute(app);
    adminApiRoute(app);
    apllyUploadRouter(app);
    applyFileRoutes(app);
    publicAPIRoute(app);
    applyTaskRoute(app);
    taskAPIRoute(app);
    reviewAPIRoute(app); // Áp dụng route review
};
