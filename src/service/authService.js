import { findUserByEmailorUserName } from "../repository/authRepository.js";
import { JSON_WEB_TOKEN_EXPIRES_IN, JSON_WEB_TOKEN_SECRET } from "../config/serverConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function userLoginService(loginPayload) {
    const { email, password, mobileNumber } = loginPayload;

    // Check if the user Registered with given email
    const user = await findUserByEmailorUserName({
        $or: [{ email: email }, { mobileNumber: mobileNumber }],
    });
    if (!user) {
        throw { message: "User not registered with the given email or mobile Number", statusCode: 404 };
    }

    //  If the user is registered, check the password with the stored password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw { message: "Invalid Password, please try again", statusCode: 401 };
    }

    // If the password is correct, create a JWT token and send it to the user
    const loginToken = jwt.sign(
        { email: user.email, _id: user._id },
        JSON_WEB_TOKEN_SECRET,
        { expiresIn: JSON_WEB_TOKEN_EXPIRES_IN });

    return loginToken;

}


export { userLoginService };