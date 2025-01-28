import { createNewUser, findUser } from "../repository/userRepository.js";

async function userRegasterService(userDetails) {
    if (
        [userDetails.email, userDetails.mobileNumber, userDetails.password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw { message: "All fileds are required", statusCode: 400 };
    };

    const existUser = await findUser({
        $or: [{ email: userDetails.email }, { mobileNumber: userDetails.mobileNumber }],
    });
    if (existUser) {
        throw { message: "User already exists", statusCode: 400 };
    }

    const newUser = await createNewUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber,
        password: userDetails.password,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
    });

    if(!newUser) {
        throw { message: "User registration failed", statusCode: 500 };
    };

    return newUser;
}


export { userRegasterService };