import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;
export const JSON_WEB_TOKEN_SECRET = process.env.JSON_WEB_TOKEN_SECRET;
export const JSON_WEB_TOKEN_EXPIRES_IN = process.env.JSON_WEB_TOKEN_EXPIRES_IN;