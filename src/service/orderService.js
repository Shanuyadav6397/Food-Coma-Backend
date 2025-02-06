import { clearCartAllItemsRepo } from "../repository/cartRepository.js";
import {
    createNewOrderRepo,
    findUserById,
    getCartByUserId
} from "../repository/orderRepository.js";
import { BadRequestError } from "../utils/badRequestError.js";
import { InternalServerError } from "../utils/internalServerError.js";
import { NotFoundError } from "../utils/notFoundError.js";

async function createNewOrderService(userId, paymentMethod) {
    const cart = await getCartByUserId(userId);
    // console.log(cart);
    if (!cart) {
        throw new NotFoundError("Cart");
    };

    if (cart.items.length === 0) {
        throw new BadRequestError("Cart is empty, please add items to cart before ordering");
    }

    const user = await findUserById({ _id: cart.user });
    if (!user) {
        throw new NotFoundError("User");
    }

    const orderObject = {};
    orderObject.user = cart.user;
    orderObject.items = cart.items.map(cartItem => {
        return {
            product: cartItem.product.id,
            quantity: cartItem.quantity
        }
    });
    orderObject.status = "ORDERED";
    orderObject.totalAmount = 0;
    cart.items.forEach((cartItem) => {
        orderObject.totalAmount += cartItem.product.price * cartItem.quantity;
    });
    //orderObject.totalAmount = orderObject.totalAmount.toFixed(2);
    orderObject.address = user.address;
    orderObject.paymentMethod = paymentMethod;

    const order = await createNewOrderRepo(orderObject);
    if (!order) {
        throw new InternalServerError("Order");
    }

    await clearCartAllItemsRepo(userId);
    return order;
}

export { createNewOrderService };