import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET } from './serverConfig.js';
import fs from 'fs';

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

const uploadImageOnCloudinary = async (filePath) => {
    try {
        if (!filePath) {
            throw new Error('File path is required');
        }
        const result = await cloudinary.uploader.upload(filePath, { resource_type: 'auto' });
        fs.unlinkSync(filePath);
        return result;
    } catch (error) {
        fs.unlinkSync(filePath);
        console.error(error);
        throw new Error('Error while uploading image to Cloudinary');
    }
}

export { uploadImageOnCloudinary };