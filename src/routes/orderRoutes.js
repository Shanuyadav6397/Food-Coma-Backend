import { Router } from "express";
import { isLoggedIn } from "../vaildation/isLoggedIn.js";
import { createNewOrderController } from "../controllers/orderControllers.js";

const orderRouter = Router();

orderRouter.route("/").post(isLoggedIn, createNewOrderController);

export { orderRouter };