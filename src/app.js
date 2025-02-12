import express from 'express';
import { PORT } from './config/serverConfig.js';
import connectDB from './config/dbConfig.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'https://food-coma-frontend-97oz-shanu-yadavs-projects.vercel.app/', // to allow requests from the client
    credentials: true // to allow cookies from the client
    })); 
    // // middleware to allow cross-origin requests
app.use(express.json({ limit: "16kb" })); // middleware to parse JSON data
app.use(express.urlencoded({ extended: true })); // middleware to parse URL encoded data
app.use(express.text()); // middleware to parse text data
app.use(cookieParser()); // middleware to parse cookies

// import routes
import { userRouter } from './routes/userRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { productRouter } from './routes/productRoutes.js';
import { cartRouter } from './routes/cartRoutes.js';
import { orderRouter } from './routes/orderRoutes.js';
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/order', orderRouter);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}....`);

});