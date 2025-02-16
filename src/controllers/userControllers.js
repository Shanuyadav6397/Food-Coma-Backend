import {
    initiateRegistrationService,
    userRegasterService,
    verifyOtpAndRegisterService
} from "../service/userService.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";


async function initiateRegistrationController(req, res) {
    try {
        const result = await initiateRegistrationService(req.body);
        return res.status(200).json(
            new ApiResponse(200, "OTP sent successfully", { email: result.email }, {})
        );
    } catch (error) {
        console.log(error);
        const apiError = new ApiError(error.statusCode || 500, error.message || "Registration initiation failed", {}, error);
        return res.status(error.statusCode || 500).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false,
        });
    }
}

async function verifyOtpAndRegisterController(req, res) {
    try {
        const newUser = await verifyOtpAndRegisterService(req.body);
        return res.status(201).json(
            new ApiResponse(201, "User registered successfully", newUser, {})
        );
    } catch (error) {
        console.log(error);
        const apiError = new ApiError(error.statusCode || 500, error.message || "Registration failed", {}, error);
        return res.status(error.statusCode || 500).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false,
        });
    }
}


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


export {
    initiateRegistrationController,
    verifyOtpAndRegisterController,
    userRegasterController
};