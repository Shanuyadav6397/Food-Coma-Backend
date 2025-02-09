import { Router } from "express";
import {
    allProductFindController,
    productCreateController,
    productDeleteController,
    productFindController
} from "../controllers/productControllers.js";
import { uploader } from "../middleware/multer.js";
import { isAdmin, isLoggedIn } from "../vaildation/isLoggedIn.js";


const productRouter = Router();

productRouter.route("/create", isLoggedIn, isAdmin).post(isLoggedIn, isAdmin, uploader.single('productImage'), productCreateController);
productRouter.route("/:id").get(productFindController);
productRouter.route("/:id").delete(productDeleteController);
productRouter.route("/").get(allProductFindController);

export { productRouter };