import express from 'express';
import {
    initiateRegistrationController,
    userRegasterController,
    verifyOtpAndRegisterController
} from '../controllers/userControllers.js';
const userRouter = express.Router();

userRouter.route('/initiate-register').post(initiateRegistrationController);
userRouter.route('/verify-otp').post(verifyOtpAndRegisterController);
userRouter.route('/register').post(userRegasterController);

export { userRouter };