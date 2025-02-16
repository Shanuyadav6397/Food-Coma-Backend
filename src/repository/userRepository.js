import User from "../schema/userSchema.js";
import { BadRequestError } from "../utils/badRequestError.js";
import { InternalServerError } from "../utils/internalServerError.js";

async function findUser(user) {
    try {
        const response = await User.findOne({ ...user });
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function createNewUser(userDetails) {
    try {
        const newUser = await User.create({ ...userDetails });
        return newUser;
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            });
            console.log(errorMessageList);
            throw new BadRequestError(errorMessageList);
        }
        throw new InternalServerError();
    }
}

async function saveOtpToUser(userDetails) {
    try {
        // First try to find if a temporary registration exists
        let user = await User.findOne({ email: userDetails.email });

        if (user) {
            // Update existing temporary registration
            user.otp = userDetails.otp;
            user.otpExpiry = userDetails.otpExpiry;
            await user.save();
            return user;
        } else {
            // Create new temporary registration
            const tempUser = await User.create({
                email: userDetails.email,
                mobileNumber: userDetails.mobileNumber,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                role: userDetails.role,
                password: userDetails.password,
                otp: userDetails.otp,
                otpExpiry: userDetails.otpExpiry,
                isVerified: false
            });
            return tempUser;
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            });
            console.log(errorMessageList);
            throw new BadRequestError(errorMessageList);
        }
        throw new InternalServerError();
    }
}

async function updateUser(id, userDetails) {
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { ...userDetails },
            { new: true, runValidators: false, validateBeforeSave: false }
        );
        await user.save();
        return user;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}

async function deleteUserData(email) {
    try {
        const user = await User.findOneAndDelete({ email: email });
        return user;
    }
    catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}


export {
    findUser,
    updateUser,
    saveOtpToUser,
    createNewUser,
    deleteUserData
};