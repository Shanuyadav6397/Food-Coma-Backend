import jwt from "jsonwebtoken";
import { JSON_WEB_TOKEN_SECRET } from "../config/serverConfig.js";
import { ApiError } from "../utils/apiError.js";
import { UnAuthorisedError } from "../utils/unAuthorizsedError.js";
import { ApiResponse } from "../utils/apiResponse.js";

async function isLoggedIn(req, res, next) {
    const token = req.cookies.authToken;
    if (!token) {
        const apiError = new ApiError(401, "Token not found", [], "Not authenticated");
        return res.status(401).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
            success: false,
        });
    }

    try {
        const tokenVerify = jwt.verify(token, JSON_WEB_TOKEN_SECRET);
        console.log(tokenVerify);
        const error = new UnAuthorisedError("Token not verified");
        if (!tokenVerify) {
            return res.status(401).json({
                message: error.message,
                statusCode: error.statusCode,
            });
        }

        req.user = {
            email: tokenVerify.email,
            _id: tokenVerify._id,
            role: tokenVerify.role,
        };
        next();
    } catch (error) {
        console.log(error.name);
        if (error.name === "TokenExpiredError") {
            const options = {
                httpOnly: true,
                secure: true,
            };
            return res.status(200)
                .clearCookie("authToken", options)
                .json(new ApiResponse(200, "Log out successfull", {}, {}));
        };
        const apiError = new ApiError(401, "Token not verified", [], "Not authenticated");
        return res.status(401).json({
            message: apiError.message,
            statusCode: apiError.statusCode,
            error: apiError.error,
        });

    }

}

async function isAdmin(req, res, next) {
    const loggedInUser = req.user;
    console.log(loggedInUser);
    if (loggedInUser.role === "ADMIN") {
        next();
    } else {
        const error = new UnAuthorisedError("Product add");
        return res.status(401).json({
            message: error.message,
            statusCode: error.statusCode,
        });
    }
}

export { isLoggedIn, isAdmin };