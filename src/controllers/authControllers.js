import { userLoginService } from "../service/authService.js";

async function userLoginController(req, res) {
    try {
        const loginPayload = req.body;
        const response = await userLoginService(loginPayload);
        res.cookie("authToken", response, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: false //process.env.NODE_ENV === "production" ? true : false
        })
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {},
            error: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
            data: {},
            error: error
        });
    }
}

export { userLoginController };