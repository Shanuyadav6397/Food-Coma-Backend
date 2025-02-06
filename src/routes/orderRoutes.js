import { Router } from "express";
import { isAdmin, isLoggedIn } from "../vaildation/isLoggedIn.js";
import {
    cancleOrderController,
    createNewOrderController,
    getOrderByOrderIdController,
    getOrdersByUserIdController,
    updateOrderStatusController
} from "../controllers/orderControllers.js";

const orderRouter = Router();

orderRouter.route("/").post(isLoggedIn, createNewOrderController);
orderRouter.route("/").get(isLoggedIn, getOrdersByUserIdController);
orderRouter.route("/:id").get(isLoggedIn, getOrderByOrderIdController);
orderRouter.route("/status").patch(isLoggedIn, isAdmin, updateOrderStatusController);
orderRouter.route("/:id/cancel").patch(isLoggedIn, cancleOrderController);

export { orderRouter };