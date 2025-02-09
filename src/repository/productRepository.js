import Product from '../schema/productSchema.js';
import { InternalServerError } from '../utils/internalServerError.js';

async function productCreateRepository(productDetails) {
    try {
        const product = await Product.create({...productDetails});
        return product;
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
        const product = await Product.findByIdAndDelete(id);
        return product;
    } catch (error) {
        console.log(error);
    }
}

async function productFindRepository(id) {
    try {
        const product = await Product.findById(id);
        console.log(product);
        return product;
    }
    catch (error) {
        console.log(error);
    }
}

async function allProductFindRepository() {
    try {
        const products = await Product.find();
        console.log(products);
        return products;
    }
    catch (error) {
        console.log(error);
    }
}


export {
    productCreateRepository,
    productDeleteRepository,
    productFindRepository,
    allProductFindRepository
};