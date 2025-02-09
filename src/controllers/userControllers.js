import { userRegasterService } from "../service/userService.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

async function userRegasterController(req, res) {
    try {
        const newuser = await userRegasterService(req.body);
        return res.status(201).json(new ApiResponse(201, "User registered successfully", newuser, {}));
    } catch (error) {
        console.log(error);
        const apiError = new ApiError(error.statusCode || 500, error.message || "Can't create user", {}, error)
        return res.status(error.statusCode || 500).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false,
        });

    }
}


export { userRegasterController };