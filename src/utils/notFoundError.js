import AppError from "./appError.js";

class NotFoundError extends AppError {
    constructor(resource) {
        super(`Not abel to find the ${resource}`, 404);
    }
}

export { NotFoundError };