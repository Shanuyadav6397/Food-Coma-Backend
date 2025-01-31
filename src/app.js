import express from 'express';
import { PORT } from './config/serverConfig.js';
import connectDB from './config/dbConfig.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json({ limit: "16kb" })); // middleware to parse JSON data
app.use(express.urlencoded({ extended: true })); // middleware to parse URL encoded data
app.use(express.text()); // middleware to parse text data
app.use(cookieParser()); // middleware to parse cookies

// import routes
import { userRouter } from './routes/userRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { productRouter } from './routes/productRoute.js';
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/product', productRouter);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}....`);

});