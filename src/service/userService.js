import { createNewCart } from "../repository/cartRepository.js";
import { createNewUser, findUser } from "../repository/userRepository.js";
import { BadRequestError } from "../utils/badRequestError.js";
import { InternalServerError } from "../utils/internalServerError.js";

async function userRegasterService(userDetails) {
    if (
        [userDetails.email, userDetails.mobileNumber, userDetails.password].some(
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

    if(!newUser) {
        throw new InternalServerError("Can't create user");
    };

    await createNewCart(newUser._id);

    return newUser;
}


export { userRegasterService };