import {
    cancleOrderStatusService,
    createNewOrderService,
    getOrderByOrderIdService,
    getOrdersByUserIdService,
    updateOrderStatusService
} from "../service/orderService.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

async function createNewOrderController(req, res) {
    try {
        const userId = req.user._id;
        const paymentMethod = req.body.paymentMethod;
        const order = await createNewOrderService(userId, paymentMethod);
        return res.status(200).json(new ApiResponse(200, "Order created successfull", order, null));
    } catch (error) {
        console.log(error);
        const apiError = new ApiError(error.statusCode || 500, error.message || "Can't create order", {}, error);
        return res.status(error.statusCode || 500).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false
        });
    }
}

async function getOrdersByUserIdController(req, res) {
    try {
        const userId = req.user._id;
        console.log(userId);
        const orders = await getOrdersByUserIdService(userId);
        return res.status(200).json(new ApiResponse(200, "Orders fetched successfully", orders, null));
    } catch (error) {
        console.log(error);
        const apiError = new ApiError(error.statusCode || 500, error.message || "Can not find the orders", {}, error);
        return res.status(error.statusCode || 500).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false
        });
    }
}

async function getOrderByOrderIdController(req, res) {
    try {
        const orderId = req.params.id;
        const order = await getOrderByOrderIdService(orderId);
        return res.status(200).json(new ApiResponse(200, "Order fetched successfully", order, null));
    } catch (error) {
        console.log(error);
        const apiError = new ApiError(error.statusCode || 500, error.message || "Can not find the order", {}, error);
        return res.status(error.statusCode || 500).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false
        });
    }
}

async function updateOrderStatusController(req, res) {
    try {
        const orderId = req.body.orderId;
        const status = req.body.status;
        const order = await updateOrderStatusService(orderId, status);
        return res.status(200).json(new ApiResponse(200, "Order status updated successfully", order, null));
    } catch (error) {
        console.log(error);
        const apiError = new ApiError(error.statusCode || 500, error.message || "Can not update the order status", {}, error);
        return res.status(error.statusCode || 500).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false
        });
    }
}

async function cancleOrderController(req, res) {
    try {
        const orderId = req.params.id;
        const status = "CANCELLED";
        const order = await cancleOrderStatusService(orderId, status);
        return res.status(200).json(new ApiResponse(200, "Order cancelled successfully", order, null));
    } catch (error) {
        console.log(error);
        const apiError = new ApiError(error.statusCode || 500, error.message || "Can not cancel the order", {}, error);
        return res.status(error.statusCode || 500).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false
        });
    }
}


export {
    createNewOrderController,
    getOrdersByUserIdController,
    getOrderByOrderIdController,
    updateOrderStatusController,
    cancleOrderController
};