import express from 'express';
import { userRegasterController } from '../controllers/userControllers.js';


const userRouter = express.Router();

userRouter.route('/register').post(userRegasterController);


export { userRouter };