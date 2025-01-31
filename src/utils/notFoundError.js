import AppError from "./appError.js";

class NotFoundError extends AppError {
    constructor(resource) {
        super(`Not found the ${resource}`, 404);
    }
}

export { NotFoundError };