import express from 'express';
import { logout, userLoginController } from '../controllers/authControllers.js';
import { isLoggedIn } from '../vaildation/isLoggedIn.js';

const authRouter = express.Router();

authRouter.route('/login').post(userLoginController);
authRouter.route("/logout").post(isLoggedIn, logout);


export { authRouter };