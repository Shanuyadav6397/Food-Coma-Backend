import { productCreateService } from "../service/productService.js";

async function productCreateController(req, res) {
    const productDetails = {
        productName: req.body.productName,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        inStock: req.body.inStock,
        productImage: req.file.path // This is the path where the image is stored
    }
    console.log(productDetails);
    try {
        const response = await productCreateService(productDetails);
        res.status(201).json({
            message: 'Product created successfully',
            product: response,
            error: {},
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({
            message: error.message || "Internal server error",
            product: {},
            error: error,
            success: false
        });
    }
}


export { productCreateController };