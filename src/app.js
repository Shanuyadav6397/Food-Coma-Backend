import express from 'express';
import { PORT } from './config/serverConfig.js';
import connectDB from './config/dbConfig.js';


const app = express();

app.use(express.json({limit: "16kb"})); // middleware to parse JSON data
app.use(express.urlencoded({ extended: true })); // middleware to parse URL encoded data
app.use(express.text()); // middleware to parse text data

// import routes
import { userRouter } from './routes/userRoutes.js';
app.use('/api/v1/user', userRouter);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on port ${PORT}....`);

});