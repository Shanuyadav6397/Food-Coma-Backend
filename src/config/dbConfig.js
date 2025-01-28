import mongoose from 'mongoose';
import { MONGO_URI } from './serverConfig.js';

async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(MONGO_URI);
        console.log(`\nMongoDB Connected !! DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(error);
        console.log('Failed to connect to the database....');
    }
}

export default connectDB;