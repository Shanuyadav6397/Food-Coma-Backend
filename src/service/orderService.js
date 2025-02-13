import { clearCartAllItemsRepo } from "../repository/cartRepository.js";
import {
    createNewOrderRepo,
    findUserById,
    getCartByUserId,
    getOrderByOrderId,
    getOrdersByUserId,
    UpdateOrderByOrderId
} from "../repository/orderRepository.js";
import { BadRequestError } from "../utils/badRequestError.js";
import { InternalServerError } from "../utils/internalServerError.js";
import { NotFoundError } from "../utils/notFoundError.js";

async function createNewOrderService(userId, paymentMethod) {
    const cart = await getCartByUserId(userId);
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
    orderObject.items = cart.items;
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

async function getOrdersByUserIdService(userId) {
    if (!userId) {
        throw new BadRequestError("User Id");
    }

    const orders = await getOrdersByUserId(userId);
    if (!orders) {
        throw new NotFoundError("Orders");
    }
    return orders;
}

async function getOrderByOrderIdService(orderId) {
    if (!orderId) {
        throw new BadRequestError("Order Id");
    }

    const order = await getOrderByOrderId(orderId);
    if (!order) {
        throw new NotFoundError("Order");
    }
    return order;
}

async function updateOrderStatusService(orderId, status) {
    if (!orderId) {
        throw new BadRequestError("Order Id");
    }

    if (!status) {
        throw new BadRequestError("Status");
    }

    const order = await getOrderByOrderId(orderId);
    if (!order) {
        throw new NotFoundError("Order");
    }

    const updatedOrder = await UpdateOrderByOrderId(orderId, status);
    if (!updatedOrder) {
        throw new InternalServerError("Order");
    }
    return updatedOrder;
}

async function cancleOrderStatusService(orderId, status) {
    if (!orderId) {
        throw new BadRequestError("Order Id");
    }

    const order = await getOrderByOrderId(orderId);
    if (!order) {
        throw new NotFoundError("Order");
    }
    console.log(status);
    const updatedOrder = await UpdateOrderByOrderId(orderId, status);
    if (!updatedOrder) {
        throw new InternalServerError("Order");
    }
    return updatedOrder;
}

export {
    createNewOrderService,
    getOrdersByUserIdService,
    getOrderByOrderIdService,
    updateOrderStatusService,
    cancleOrderStatusService
};