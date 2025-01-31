import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
});

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;
export const JSON_WEB_TOKEN_SECRET = process.env.JSON_WEB_TOKEN_SECRET;
export const JSON_WEB_TOKEN_EXPIRES_IN = process.env.JSON_WEB_TOKEN_EXPIRES_IN;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;