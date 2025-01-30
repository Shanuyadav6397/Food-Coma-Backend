import express from 'express';
import { userLoginController } from '../controllers/authControllers.js';

const authRouter = express.Router();

authRouter.route('/login').post(userLoginController);


export { authRouter };