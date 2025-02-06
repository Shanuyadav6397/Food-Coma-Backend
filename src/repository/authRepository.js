import User from "../schema/userSchema.js";

async function findUserByEmailorUserName(user) {
    try {
        const response = await User.findOne({ ...user });
        return response;
    } catch (error) {
        console.log(error);
    }
}


export { findUserByEmailorUserName };