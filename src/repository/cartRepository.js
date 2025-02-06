import Cart from "../schema/cartSchema.js";

async function createNewCart(userId) {
    try {
        const newCart = await Cart.create({ user: userId });
        return newCart;
    } catch (error) {
        console.log(error);
    }
}

async function findUserCartRepo(userId) {
    try {
        const cart = await Cart.findOne({ user: userId }).populate("items.product");
        return cart;
    } catch (error) {
        console.log(error);
    }
}

async function clearCartAllItemsRepo(userId) {
    try {
        const cart = await Cart.findOne({ user: userId });
        cart.items = [];
        await cart.save();
        return cart;
    }
    catch (error) {
        console.log(error);
    }
}

async function fetchUserCartByCartIdRepo(cartId) {
    try {
        const cart = await Cart.findOne({ _id: cartId });
        return cart;
    } catch (error) {
        console.log(error);
    }
}

export {
    createNewCart,
    findUserCartRepo,
    fetchUserCartByCartIdRepo,
    clearCartAllItemsRepo
};