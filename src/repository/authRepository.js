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
        const response = await User.findOne({ email: email });
        return response;
    }
    catch (error) {
        console.log(error);
    }
}

async function chnageUserPassword(user, hashedPassword) {
    try {
        const response = await user.updateOne({ password: hashedPassword });
        return response;
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