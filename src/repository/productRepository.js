import Product from '../schema/productSchema.js';
import { InternalServerError } from '../utils/internalServerError.js';

async function productCreateRepository(productDetails) {
    try {
        const response = await Product.create({...productDetails});
        return response;
    } catch (error) {
        if (error.name === 'MongooseError') {
            new InternalServerError(error.message, 'productRepository');
        }
        console.log(error.name);
        console.log(error);
    }
}

async function productDeleteRepository(id) {
    try {
        const response = await Product.findByIdAndDelete(id);
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function productFindRepository(id) {
    try {
        const response = await Product.findById(id);
        console.log(response);
        return response;
    }
    catch (error) {
        console.log(error);
    }
}


export {
    productCreateRepository,
    productDeleteRepository,
    productFindRepository
};