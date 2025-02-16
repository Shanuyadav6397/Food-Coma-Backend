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

async function chnageUserPassword(user, newPassword) {
    try {
        user.password = newPassword;
        await user.save({ validateBeforeSave: false });
        const changedPassword = await User.findById(user._id).select('-password -__v');
        return changedPassword;
    }
    catch (error) {
        console.log(error);
    }
}


export {
    findUserByEmailorUserName,
    findUserByEmail,
    chnageUserPassword
};