import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minLength: [3, 'Product name should be at least 3 characters long'],
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true,
        minLength: [5, 'product description should be at least 5 characters long']
    },
    productImage: {
        type: String
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
    },
    category: {
        type: String,
        enum: ['veg', 'non-veg', 'drinks'],
        default: 'veg'
    },
    inStock: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);

export default Product;