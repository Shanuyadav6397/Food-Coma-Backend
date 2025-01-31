import { Router } from "express";
import { productCreateController } from "../controllers/productControllers.js";
import { uploader } from "../middleware/multer.js";


const productRouter = Router();

productRouter.route("/create").post(uploader.single('productImage'), productCreateController);

export { productRouter };