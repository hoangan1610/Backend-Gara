import express from "express";
import {
  PublicController
} from "../controllers";

let publicAPI = express.Router();

let publicAPIRoute = (app) => {
  publicAPI.get("/get-policies", new PublicController().getPolicies);
  publicAPI.get("/get-promotions", new PublicController().getPromotions);

  return app.use("/api/v1/public", publicAPI);
}

export default publicAPIRoute;