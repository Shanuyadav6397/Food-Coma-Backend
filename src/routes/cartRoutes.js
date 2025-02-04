import { Router } from "express";
import {
    addAndRemoveProductToUserCartController,
    clearCartAllItemsController,
    fetchUserCartController
} from "../controllers/cartController.js";
import { isLoggedIn } from "../vaildation/isLoggedIn.js";

const cartRouter = Router();

cartRouter.route("/fetch").get(isLoggedIn, fetchUserCartController);
cartRouter.route("/:operation/:productId").post(isLoggedIn, addAndRemoveProductToUserCartController);
cartRouter.route("/clear").delete(isLoggedIn, clearCartAllItemsController);
//cartRouter.route("/fetch/:cartId").get(fetchUserCartByCarIdController);

export { cartRouter };