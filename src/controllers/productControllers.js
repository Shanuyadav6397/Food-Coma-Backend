import {
    productCreateService,
    productDeleteService,
    productFindService
} from "../service/productService.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

async function productCreateController(req, res) {
    const productDetails = {
        productName: req.body.productName,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        inStock: req.body.inStock,
        productImage: req.file?.path // This is the path where the image is stored
    }
    console.log(productDetails);
    try {
        const response = await productCreateService(productDetails);
        res.status(201).json(new ApiResponse(201, 'Product created successfully', response, {}));
    } catch (error) {
        console.log(error);
        const apiError = new ApiError(error.statusCode || 500, error.message || "Can't create product", {}, error)
        res.status(error.statusCode || 500).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false,
        });
    }
}

async function productDeleteController(req, res) {
    try {
        const id = req.params.id;
        const product = await productDeleteService(id);
        res.status(200).json(new ApiResponse(200, 'Product deleted successfully', product, {}));
    } catch (error) {
        console.log(error);
        const apiError = new ApiError(error.statusCode || 500, error.message || "Can't delete product", {}, error)
        res.status(error.statusCode || 500).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false,
        });

    }
}

async function productFindController(req, res) {
    try {
        const id = req.params.id;
        const product = await productFindService(id);
        res.status(200).json(new ApiResponse(200, 'Product found successfully', product, null));
    } catch (error) {
        console.log(error);
        const apiError = new ApiError(error.statusCode || 500, error.message || "Can't find product", {}, error);
        res.status(error.statusCode || 500).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false,
        });
    }
}


export {
    productCreateController,
    productDeleteController,
    productFindController
};