import AppError from "./appError.js";

class UnAuthorisedError extends AppError {
    constructor(resource) {
        super(`User is not Authorised for this action ${resource}`, 401);
    }
}

export { UnAuthorisedError };