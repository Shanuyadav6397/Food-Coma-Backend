import { clearCartAllItemsRepo, findUserCartRepo } from "../repository/cartRepository.js";
import { productFindRepository } from "../repository/productRepository.js";
import { BadRequestError } from "../utils/badRequestError.js";
import { NotFoundError } from "../utils/notFoundError.js";

async function fetchUserCartService(userId) {
    if (!userId) {
        throw new BadRequestError("User ID is required");
    };
    const userCart = await findUserCartRepo(userId);
    if (!userCart) {
        throw new NotFoundError("Cart");
    };
    return userCart;
}

async function addAndRemoveProductToUserCartService(userId, productId, shouldAdd = true) {
    if (!userId) {
        throw new BadRequestError("User ID is required");
    };
    if (!productId) {
        throw new BadRequestError("Product ID is required");
    };

    const userCart = await findUserCartRepo(userId);
    if (!userCart) {
        throw new NotFoundError("Cart");
    };

    const product = await productFindRepository(productId);
    if (!product) {
        throw new NotFoundError("product");
    };

    const inStock = product.inStock;
    const quantity = product.quantity;
    console.log(productId);
    if (quantity < 1 && inStock === false) {
        throw new BadRequestError("This product is out of stock", 409);
    };
    const quantityValue = (shouldAdd == true) ? 1 : -1;
    let foundProduct = false;
    const productIndex = userCart.items.findIndex(item => {
        if (item.product._id.toString() === productId) {
            if (shouldAdd) {
                if (product.quantity >= item.quantity + 1) {
                    item.quantity += quantityValue;
                } else {
                    throw new BadRequestError("The quantity of the item requested is not available", 409);
                };
            } else {
                if (item.quantity > 0) {
                    item.quantity += quantityValue;
                    if (item.quantity == 0) {
                        userCart.items = userCart.items.filter(item => item.product._id != productId);
                        foundProduct = true;
                        return;
                    };
                }
                else {
                    throw new NotFoundError("Product quantity is already 0", 404);
                };
            };
            foundProduct = true;
        };
    });
    if (!foundProduct) {
        if (shouldAdd) {
            userCart.items.push({
                product: productId,
                quantity: 1
            });
        } else {
            throw new NotFoundError("Product in the cart", 404);
        };
    };

    await userCart.save();
    return userCart;
}


async function clearCartAllItemsService(userId) {
    if (!userId) {
        throw new BadRequestError("Cart ID is required");
    };
    const cart = await clearCartAllItemsRepo(userId);
    if (!cart) {
        throw new NotFoundError("Cart");
    };
    if (cart.items.length === 0) {
        throw new BadRequestError("Cart is already empty", 404);
    };
    return cart;
}


export {
    fetchUserCartService,
    addAndRemoveProductToUserCartService,
    clearCartAllItemsService
};