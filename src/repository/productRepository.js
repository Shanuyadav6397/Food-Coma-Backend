import Product from '../schema/productSchema.js';

async function productCreateRepository(productDetails) {
    try {
        const response = await Product.create({...productDetails});
        return response;
    } catch (error) {
        console.log(error);
    }
}


export { productCreateRepository };