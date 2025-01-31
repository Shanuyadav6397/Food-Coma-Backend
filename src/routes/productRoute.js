import { Router } from "express";
import {
    productCreateController,
    productDeleteController,
    productFindController
} from "../controllers/productControllers.js";
import { uploader } from "../middleware/multer.js";


const productRouter = Router();

productRouter.route("/create").post(uploader.single('productImage'), productCreateController);
productRouter.route("/:id").get(productFindController);
productRouter.route("/:id").delete(productDeleteController);

export { productRouter };