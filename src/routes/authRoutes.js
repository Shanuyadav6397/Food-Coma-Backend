import express from 'express';
import {
    logout,
    userLoginController,
    userPasswordResetController
} from '../controllers/authControllers.js';

const authRouter = express.Router();

authRouter.route('/login').post(userLoginController);
authRouter.route("/logout").post(logout);
authRouter.route("/forgot/password").post(userPasswordResetController);

export { authRouter };