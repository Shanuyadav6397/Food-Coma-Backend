import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ["PROCESSING", "ORDERED", "CANCELLED", "PROCESSING", "OUR_FOR_DELIVERY", "DELIVERED"],
        default: "ORDERED"
    },
    // paymentStatus: {
    //     type: String,
    //     enum: ["PENDING", "COMPLETED", "FAILED"],
    //     default: "PENDING"
    // },
    paymentType: {
        type: String,
        enum: ["COD", "ONLINE"],
        default: "COD"
    },
    address: {
        type: String,
        minLength: [10, "Address must be at least 10 characters long"],
    }
}, { timestamps: true });


const Order = mongoose.model("Order", orderSchema);

export default Order;