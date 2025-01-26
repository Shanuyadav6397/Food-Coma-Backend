import express from 'express';
import { PORT } from './config/serverConfig.js';
import connectDB from './config/dbConfig.js';

const app = express();

app.listen(PORT, async()=>{
    await connectDB();
    console.log(`Server is running on port ${PORT}....`);

});
