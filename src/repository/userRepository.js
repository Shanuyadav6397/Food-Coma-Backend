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
        const response = await User.create({ ...userDetails });
        return response;
    } catch (error) {
        if (error.name === 'ValidationError') {

            const errorMessageList = Object.keys(error.errors).map((property) => {
                return error.errors[property].message;
            });
            console.log(errorMessageList)
            throw new BadRequestError(errorMessageList);
        }
        throw new InternalServerError();
    }
}

export { findUser, createNewUser };