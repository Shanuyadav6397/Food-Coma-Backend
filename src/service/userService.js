import sendMail from "../config/mailerConfig.js";
import { createNewCart } from "../repository/cartRepository.js";
import {
    updateUser,
    findUser,
    saveOtpToUser,
    createNewUser,
    deleteUserData
} from "../repository/userRepository.js";
import { BadRequestError } from "../utils/badRequestError.js";
import { InternalServerError } from "../utils/internalServerError.js";


async function initiateRegistrationService(userDetails) {
    if (
        [userDetails.firstName, userDetails.email, userDetails.mobileNumber, userDetails.password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new BadRequestError("All fields are required", 400);
    }

    const existUser = await findUser({
        $or: [{ email: userDetails.email }, { mobileNumber: userDetails.mobileNumber }],
    });

    if (existUser) {
        throw new BadRequestError("User already exists", 400);
    }

    // Generate OTP
    const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
    const generatedOtp = generateOTP();

    // Save user details and OTP temporarily
    await saveOtpToUser({
        ...userDetails,
        otp: generatedOtp,
        otpExpiry: new Date(Date.now() + 10 * 60 * 500) // OTP valid for 10 minutes
    });

    // Send OTP via email
    await sendMail(
        userDetails.email,
        "Your OTP Code for Pizza App Signup",
        `Hello ${userDetails.firstName},\n\nYour OTP is: ${generatedOtp}\n\nThis OTP is valid for 5 minutes.\n\nThank you for signing up!`,
        `<p>Hello <strong>${userDetails.firstName}</strong>,</p><p>Your OTP is: <strong>${generatedOtp}</strong></p><p>This OTP is valid for 5 minutes.</p><p>Thank you for signing up!</p>`
    );


    const Interval = setInterval(() => {
        console.log("Interval running!");
        deleteUserData(userDetails.email);
    }, 10 * 60 * 500);

    setTimeout(() => {
        console.log("Interval cleared!");
        clearInterval(Interval);
    }, 10 * 60 * 600);

    return { email: userDetails.email };
}

async function verifyOtpAndRegisterService(verificationDetails) {
    const { email, otp } = verificationDetails;

    const pendingUser = await findUser({
        email,
        otp,
        otpExpiry: { $gt: new Date() }
    });


    if (!pendingUser) {
        throw new BadRequestError("Invalid or expired OTP", 400);
    }


    // Create the actual user
    const id = pendingUser._id;
    const userDetails = {
        otp: '',
        otpExpiry: '',
        isVerified: true
    }
    const newUser = await updateUser(id, userDetails);


    if (!newUser) {
        throw new InternalServerError("Can't create user");
    }

    // Create cart for new user
    //await createNewCart(newUser._id);

    // Clear OTP fields
    // pendingUser.otp = undefined;
    // pendingUser.otpExpiry = undefined;
    // pendingUser.isVerified = true;
    // await pendingUser.save();

    return newUser;
}


async function userRegasterService(userDetails) {
    if (
        [userDetails.firstName, userDetails.email, userDetails.mobileNumber, userDetails.password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new BadRequestError("All fields are required", 400);
    };

    const existUser = await findUser({
        $or: [{ email: userDetails.email }, { mobileNumber: userDetails.mobileNumber }],
    });
    if (existUser) {
        throw new BadRequestError("User already exists", 400);
    }


    const newUser = await createNewUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber,
        password: userDetails.password,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        role: userDetails.role,
    });


    if (!newUser) {
        throw new InternalServerError("Can't create user");
    };

    await createNewCart(newUser._id);

    return newUser;
}


export {
    initiateRegistrationService,
    verifyOtpAndRegisterService,
    userRegasterService
};
