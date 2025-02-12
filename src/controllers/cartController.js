import {
    addAndRemoveProductToUserCartService,
    clearCartAllItemsService,
    fetchUserCartService
} from "../service/cartService.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

async function fetchUserCartController(req, res) {
    try {
        const userId = req.user._id;
        const userCart = await fetchUserCartService(userId);
        res.status(200).json(new ApiResponse(200, "Cart fetched successfully", userCart, null));
    } catch (error) {
        const apiError = new ApiError(error.statusCode || 500, error.message || "Can't fetch cart", {}, error);
        console.log(error);
        res.status(error.statusCode || 500).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false
        });
    }
}

async function addAndRemoveProductToUserCartController(req, res) {
    try {
        const userId = req.user._id;
        const productId = req.params.productId;
        const operation = req.params.operation === "add" ? true : false;
        const userCart = await addAndRemoveProductToUserCartService(userId, productId, operation);
        if(operation == true){
            return res.status(200).json(new ApiResponse(200, "Product added to cart successfully", userCart, null));
        }else if(operation == false){
            return res.status(200).json(new ApiResponse(200, "Product removed successfully ", userCart, null));
        }
        return res.status(400).json(new ApiResponse(400, "Invalid operation", userCart, null));
    } catch (error) {
        const apiError = new ApiError(error.statusCode || 500, error.message || "Can't add product to cart", {}, error);
        console.log(error);
        res.status(error.statusCode || 500).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false
        });
    }
}

async function clearCartAllItemsController(req, res){
    try {
        const userId = req.user._id;
        const userCart = await clearCartAllItemsService(userId);
        res.status(200).json(new ApiResponse(200, "Cart cleared successfully", userCart, null));
    } catch (error) {
        const apiError = new ApiError(error.statusCode || 500, error.message || "Can't clear cart", {}, error);
        console.log(error);
        res.status(error.statusCode || 500).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false
        });
    }
}


export {
    fetchUserCartController,
    addAndRemoveProductToUserCartController,
    clearCartAllItemsController
};