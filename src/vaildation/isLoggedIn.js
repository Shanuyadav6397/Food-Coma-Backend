import jwt from "jsonwebtoken";
import { JSON_WEB_TOKEN_SECRET } from "../config/serverConfig.js";

async function isLoggedIn(req, res, next) {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "User not logged in",
            data: {},
            error: "Not authenticated"
        });
    }

    const tokenVerify = jwt.verify(token, JSON_WEB_TOKEN_SECRET);
    if (!tokenVerify) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token",
            data: {},
            error: "Not authenticated"
        });
    }

    req.user = {
        email: tokenVerify.email,
        _id: tokenVerify._id
    };
    next();

}

export { isLoggedIn };