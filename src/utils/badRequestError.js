import AppError from "./appError.js";

class BadRequestError extends AppError {
    constructor(invalidParms, statusCode = 400) { // Allow dynamic status codes
        if (!Array.isArray(invalidParms)) {
            invalidParms = [String(invalidParms)];
        }

        const message = `The request has the following invalid parameters:${invalidParms.join("\n")}`;
        super(message, statusCode);
    }
}

export { BadRequestError };