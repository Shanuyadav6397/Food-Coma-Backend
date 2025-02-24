import {
    changeUserDetails,
    chnageUserPassword,
    findUserByEmail,
    findUserByEmailorUserName
} from "../repository/authRepository.js";
import { JSON_WEB_TOKEN_EXPIRES_IN, JSON_WEB_TOKEN_SECRET } from "../config/serverConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NotFoundError } from "../utils/notFoundError.js";
import { BadRequestError } from "../utils/badRequestError.js";
import { InternalServerError } from "../utils/internalServerError.js";
import { createNewCart, findUserCartRepo } from "../repository/cartRepository.js";
import sendMail from "../config/mailerConfig.js";

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
        throw new BadRequestError("Wrong password, please try again", 400);
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
    const cart = await findUserCartRepo(user._id);
    if (!cart) {
        await createNewCart(user._id);
    }

    return {
        loginToken, userRole, userData: {
            firstName: user.firstName,
            email: user.email,
        }
    };

}

async function userPasswordResetService(resetPayload) {
    const { email, oldPassword, newPassword, confirmPassword } = resetPayload;

    // Check if the user Registered with given email
    const user = await findUserByEmail(email);
    if (!user) {
        throw new NotFoundError("User not found, please register first", 404);
    }

    if (newPassword !== confirmPassword) {
        throw new BadRequestError("Password and confirm password doesn't match", 400);
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
        throw new BadRequestError("Invalid password, please try again", 400);
    }

    if (oldPassword === newPassword) {
        throw new BadRequestError("New password can't be same as old password", 400);
    }


    user.password = newPassword;
    const passwordChanged = await chnageUserPassword(user, newPassword);
    if (!passwordChanged) {
        throw new InternalServerError("Can't change password", 500);
    }
    return passwordChanged;
}

async function passwordResetUsingEmailService(email) {
    // Check if the user Registered with given email
    const user = await findUserByEmail(email);
    console.log(user);
    if (!user) {
        throw new NotFoundError("User not found, please register first", 404);
    }

    // if user already have OTP then send the same OTP
    if (user.otp) {
        await sendMail(
            user.email,
            "Your OTP Code for forgot password",
            `Hello ${user.firstName},\n\nYour OTP is: ${user.otp}\n\nThis OTP is valid for 5 minutes.`,
            `<p>Hello <strong>${user.firstName}</strong>,</p><p>Your OTP is: <strong>${user.otp}</strong></p><p>This OTP is valid for 5 minutes.</p>`
        );
        return { email: user.email };
    }

    // Generate OTP and save it to the user
    const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
    const generatedOtp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // OTP valid for 5 minutes


    // Save OTP to the user
    const updatedUser = await changeUserDetails(user, generatedOtp, otpExpiry);
    if (!updatedUser) {
        throw new InternalServerError("Can't save OTP to user", 500);
    }
    await sendMail(
        user.email,
        "Your OTP Code for forgot password",
        `Hello ${user.firstName},\n\nYour OTP is: ${generatedOtp}\n\nThis OTP is valid for 5 minutes.`,
        `<p>Hello <strong>${user.firstName}</strong>,</p><p>Your OTP is: <strong>${generatedOtp}</strong></p><p>This OTP is valid for 5 minutes.</p>`
    );

    const Interval = setInterval(() => {
        console.log("Interval running!");
        user.otp = '';
        user.otpExpiry = '';
        user.save({ validateBeforeSave: false });
    }, 10 * 60 * 500);

    setTimeout(() => {
        console.log("Interval cleared!");
        clearInterval(Interval);
    }, 10 * 60 * 600);
    return { email: updatedUser.email };

}

async function otpVerifyAndChangePasswordService(userDetails) {
    const { email, otp, newPassword, confirmPassword } = userDetails;

    // Check if the user Registered with given email
    const user = await findUserByEmail(email);
    if (!user) {
        throw new NotFoundError("User not found, please register first", 404);
    }

    if (!user.otp) {
        throw new BadRequestError("OTP not found, please try again", 400);
    }

    if (newPassword !== confirmPassword) {
        throw new BadRequestError("Password and confirm password doesn't match", 400);
    }

    if (user.otp !== otp) {
        throw new BadRequestError("Invalid OTP, please try again", 400);
    }

    const validPassword = await bcrypt.compare(newPassword, user.password);
    if (validPassword) {
        throw new BadRequestError("This is your last password, please fill another password", 400);
    }

    if (user.otpExpiry < new Date()) {
        throw new BadRequestError("OTP expired, please try again", 400);
    }

    let flag = 1
    user.password = newPassword;
    const passwordChanged = await chnageUserPassword(user, newPassword, flag);
    if (!passwordChanged) {
        throw new InternalServerError("Can't change password", 500);
    }
    return passwordChanged;


}

export {
    userLoginService,
    userPasswordResetService,
    passwordResetUsingEmailService,
    otpVerifyAndChangePasswordService,
};