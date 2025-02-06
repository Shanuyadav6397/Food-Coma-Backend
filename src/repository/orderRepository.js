import Cart from "../schema/cartSchema.js";
import User from "../schema/userSchema.js";
import Order from "../schema/orderSchema.js";

async function getCartByUserId(userId) {
    try {
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        return cart;
    } catch (error) {
        console.log(error);
    }

}

async function findUserById(userId) {
    try {
        const user = await User.findById(userId);
        return user;
    }
    catch (error) {
        console.log(error);
    }
}

async function createNewOrderRepo(orderDetails) {
    try {
        const order = await Order.create(orderDetails);
        return order;
    } catch (error) {
        console.log(error);
    }
}

async function getOrdersByUserId(userId) {
    try {
        const orders = await Order.find({ user: userId }).populate("items.product");
        return orders;
    } catch (error) {
        console.log(error);
    }
}

async function getOrderByOrderId(orderId) {
    try {
        const order = await Order.findById(orderId);
        return order;
    } catch (error) {
        console.log(error);
    }
}

async function UpdateOrderByOrderId(orderId, status) {
    try {
        const order = await Order.findByIdAndUpdate(orderId, { status: status }, { new: true });
        await order.save();
        return order;
    }
    catch (error) {
        console.log(error);
    }
}

export {
    getCartByUserId,
    findUserById,
    createNewOrderRepo,
    getOrdersByUserId,
    getOrderByOrderId,
    UpdateOrderByOrderId
};