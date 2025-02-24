import express from 'express';
import {
    logout,
    otpVerifyAndChangePasswordController,
    passwordResetUsingEmailController,
    userLoginController,
    userPasswordResetController
} from '../controllers/authControllers.js';

const authRouter = express.Router();

authRouter.route('/login').post(userLoginController);
authRouter.route("/logout").post(logout);
authRouter.route("/forgot/password").post(userPasswordResetController);
authRouter.route("/OTP").post(passwordResetUsingEmailController);
authRouter.route("/verify").post(otpVerifyAndChangePasswordController);


export { authRouter };