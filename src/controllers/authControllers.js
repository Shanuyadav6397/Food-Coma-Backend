import { userLoginService } from "../service/authService.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

async function userLoginController(req, res) {
    try {
        const loginPayload = req.body;
        const response = await userLoginService(loginPayload);
        res.cookie("authToken", response, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: false //process.env.NODE_ENV === "production" ? true : false
        })
        return res.status(200).json(new ApiResponse(200, "User logged in successfully", {}, {}));
    } catch (error) {
        console.log(error);
        const apiError = new ApiError(error.statusCode || 500, error.message || "Can't login user", {}, error)
        return res.status(error.statusCode || 500).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false,
        });
    }
}

export { userLoginController };