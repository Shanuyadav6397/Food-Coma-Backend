import AppError from "./appError.js";

class BadRequestError extends AppError {
    constructor(invalidParms, statusCode = 400) { // Allow dynamic status codes
        if (!Array.isArray(invalidParms)) {
            invalidParms = [String(invalidParms)];
        }

        const message = `${invalidParms}`;
        super(message, statusCode);
    }
}

export { BadRequestError };