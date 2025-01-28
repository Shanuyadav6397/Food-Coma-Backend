import { userRegasterService } from "../service/userService.js";

async function userRegasterController(req, res) {
    try {
        const newuser = await userRegasterService(req.body);
        return res.status(201).json({
            message: "User registered successfully",
            data: newuser,
            success: true,
            error: {}
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || "Internal server error",
            success: false,
            error: error || error.message
        });

    }
}


export { userRegasterController };