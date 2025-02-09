import { findUserByEmailorUserName } from "../repository/authRepository.js";
import { JSON_WEB_TOKEN_EXPIRES_IN, JSON_WEB_TOKEN_SECRET } from "../config/serverConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NotFoundError } from "../utils/notFoundError.js";
import { BadRequestError } from "../utils/badRequestError.js";
import { InternalServerError } from "../utils/internalServerError.js";

async function userLoginService(loginPayload) {
    const { email, password, mobileNumber } = loginPayload;

    // Check if the user Registered with given email
    const user = await findUserByEmailorUserName({
        $or: [{ email: email }, { mobileNumber: mobileNumber }],
    });
    if (!user) {
        throw new NotFoundError("User not found, please register first", 404);
    }

    //  If the user is registered, check the password with the stored password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new BadRequestError("Password is incorrect", 400);
    }

    const userRole = user.role ? user.role : "USER";

    // If the password is correct, create a JWT token and send it to the user
    const loginToken = jwt.sign(
        { email: user.email, _id: user._id, role: userRole },
        JSON_WEB_TOKEN_SECRET,
        { expiresIn: JSON_WEB_TOKEN_EXPIRES_IN });

    if (!loginToken) {
        throw new InternalServerError("Can't create login token", 500);
    }

    return {loginToken, userRole, userData:{
        firstName: user.firstName,
        email: user.email,
    }};

}


export { userLoginService };