import { uploadImageOnCloudinary } from '../config/cloudinaryConfig.js';
import {
    productCreateRepository,
    productDeleteRepository,
    productFindRepository
} from '../repository/productRepository.js';
import fs from 'fs';
import { NotFoundError } from "../utils/notFoundError.js";
import { BadRequestError } from "../utils/badRequestError.js";
import { InternalServerError } from "../utils/internalServerError.js";

async function productCreateService(productDetails) {
    try {
        const { productName, price, description } = productDetails;

        if (!productName) {
            throw new BadRequestError("Product name is required", 400);
        }
        if (!price) {
            throw new BadRequestError("Product price is required", 400);
        }
        if (!description) {
            throw new BadRequestError("Product description is required", 400);
        }

        const productImageLocalPath = productDetails.productImage;
        if (!productImageLocalPath) {
            throw new BadRequestError("Product image is required", 400);
        }
        const productImageFromCloudinary = await uploadImageOnCloudinary(productImageLocalPath);
        if (!productImageFromCloudinary) {
            throw new InternalServerError("Can't upload image to cloudinary", 500);
        }

        const product = await productCreateRepository({
            ...productDetails,
            productImage: productImageFromCloudinary.url
        });

        if (!product) {
            throw new InternalServerError("Can't create product", 500);
        }

        return product;
    } catch (error) {
        fs.unlinkSync(productDetails.productImage);
        console.log(error);
    }
}

async function productDeleteService(id) {
    if (!id) {
        throw new BadRequestError("Product id is required", 400);
    }
    const product = await productDeleteRepository(id);
    if (!product) {
        throw new NotFoundError("Product not found", 404);
    }
    return product;
}

async function productFindService(id) {
    if (!id) {
        throw new BadRequestError("Product id is required", 400);
    }
    const product = await productFindRepository(id);
    if (!product) {
        throw new NotFoundError("Product not found", 404);
    }
    return product;
}


export {
    productCreateService,
    productDeleteService,
    productFindService
};