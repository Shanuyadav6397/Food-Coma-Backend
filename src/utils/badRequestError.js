import AppError from "./appError.js";

class BadRequestError extends AppError {
    constructor(invalidParms) {
        let message = "";
        invalidParms.forEach(invalidParm => message += `${invalidParm}\n `);
        super(`The request has the following invalid parms\n ${invalidParms}`, 400);
    }
}

export { BadRequestError };