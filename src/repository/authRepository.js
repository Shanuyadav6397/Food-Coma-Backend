import User from "../schema/userSchema.js";

async function findUserByEmailorUserName(user) {
    try {
        const response = await User.findOne({ ...user });
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function findUserByEmail(email) {
    try {
        const user = await User.findOne({ email: email });
        return user;
    }
    catch (error) {
        console.log(error);
    }
}

async function chnageUserPassword(user, newPassword, flag) {
    try {
        user.password = newPassword;
        if (flag == 1) {
            user.otp = '';
            user.otpExpiry = '';
        }
        await user.save({ validateBeforeSave: false });
        const changedPassword = await User.findById(user._id).select('-password -__v');
        return changedPassword;
    }
    catch (error) {
        console.log(error);
    }
}

async function changeUserDetails(user, OTP, otpExpiry) {
    try {
        user.otp = OTP;
        user.otpExpiry = otpExpiry;
        await user.save({ validateBeforeSave: false });
        return user;
    } catch (error) {
        console.log(error);
    }
}


export {
    findUserByEmailorUserName,
    findUserByEmail,
    chnageUserPassword,
    changeUserDetails
};