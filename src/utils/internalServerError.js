import AppError from "./appError.js";

class InternalServerError extends AppError {
    constructor(properties, resource) {
        super (`Internal server error: ${properties} from the ${resource}`, 500);
    }
}

export { InternalServerError };