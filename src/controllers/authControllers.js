import {
    otpVerifyAndChangePasswordService,
    passwordResetUsingEmailService,
    userLoginService,
    userPasswordResetService
} from "../service/authService.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

async function userLoginController(req, res) {
    try {
        const loginPayload = req.body;
        const response = await userLoginService(loginPayload);
        res.cookie("authToken", response.loginToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true, //process.env.NODE_ENV === "production" ? true : false
            sameSite: "none"
        });
        return res.status(200).json(new ApiResponse(200, "User logged in successfully", { data: { userRole: response.userRole, userData: response.userData } }, {}));
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

async function logout(req, res) {
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res.status(200)
        .clearCookie("authToken", options)
        .json(new ApiResponse(200, "Log out successfull", {}, {}));

}

async function userPasswordResetController(req, res) {
    try {
        const resetPayload = req.body;
        const response = await userPasswordResetService(resetPayload);
        return res.status(200).json(new ApiResponse(200, "Password reset successfully", { data: response }, {}));
    } catch (error) {
        console.log(error);
        const apiError = new ApiError(error.statusCode || 500, error.message || "Can't reset password", {}, error)
        return res.status(error.statusCode || 500).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false,
        });
    }
}


async function passwordResetUsingEmailController(req, res) {
    try {
        const email = req.body.email;
        const response = await passwordResetUsingEmailService(email);
        return res.status(200).json(new ApiResponse(200, "OTP sent successfully to the register email", { data: response }, {}));
    } catch (error) {
        console.log(error);
        const apiError = new ApiError(error.statusCode || 500, error.message || "Can't sent OTP", {}, error)
        return res.status(error.statusCode || 500).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false,
        });
    }
}

async function otpVerifyAndChangePasswordController(req, res) {
    try {
        const userDetails = req.body;
        const response = await otpVerifyAndChangePasswordService(userDetails);
        return res.status(200).json(new ApiResponse(200, "Password Changed Successfully", { data: response }, {}));
    } catch (error) {
        console.log(error);
        const apiError = new ApiError(error.statusCode || 500, error.message || "Can't reset password", {}, error)
        return res.status(error.statusCode || 500).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false,
        });
    }
}

export {
    userLoginController,
    logout,
    userPasswordResetController,
    passwordResetUsingEmailController,
    otpVerifyAndChangePasswordController
};