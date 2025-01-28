import User from "../schema/userSchema.js";

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
        const response = await User.create({ ...userDetails });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export { findUser, createNewUser };