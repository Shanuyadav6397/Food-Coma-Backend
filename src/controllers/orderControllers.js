import { createNewOrderService } from "../service/orderService.js";
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


export { createNewOrderController };