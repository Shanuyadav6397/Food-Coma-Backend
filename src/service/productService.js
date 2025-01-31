import { uploadImageOnCloudinary } from '../config/cloudinaryConfig.js';
import {
    productCreateRepository,
    productDeleteRepository,
    productFindRepository
} from '../repository/productRepository.js';
import fs from 'fs';

async function productCreateService(productDetails) {
    try {
        const { productName, price, description } = productDetails;

        if (!productName) {
            throw ({ message: 'Product name are required', statusCode: 400 });
        }
        if (!price) {
            throw ({ message: 'Product price are required', statusCode: 400 });
        }
        if (!description) {
            throw ({ message: 'Product description are required', statusCode: 400 });
        }

        const productImageLocalPath = productDetails.productImage;
        if (!productImageLocalPath) {
            throw ({ message: 'Product image is required', statusCode: 400 });
        }
        const productImageFromCloudinary = await uploadImageOnCloudinary(productImageLocalPath);
        if (!productImageFromCloudinary) {
            throw ({ message: 'Error in uploading image on cloudinary', statusCode: 500 });
        }

        const product = await productCreateRepository({
            ...productDetails,
            productImage: productImageFromCloudinary.url
        });

        if (!product) {
            throw ({ message: 'Error in creating product', statusCode: 500 });
        }

        return product;
    } catch (error) {
        fs.unlinkSync(productDetails.productImage);
        console.log(error);
    }
}

async function productDeleteService(id) {
    if (!id) {
        throw ({ message: 'Product id is required', statusCode: 400 });
    }
    const product = await productDeleteRepository(id);
    if (!product) {
        throw ({ message: 'This product is not exist', statusCode: 500 });
    }
    return product;
}

async function productFindService(id) {
    if (!id) {
        throw ({ message: 'Product id is required', statusCode: 400 });
    }
    const product = await productFindRepository(id);
    if (!product) {
        throw ({ message: 'Not abel to find the product', statusCode: 404 });
    }
    return product;
}


export {
    productCreateService,
    productDeleteService,
    productFindService
};