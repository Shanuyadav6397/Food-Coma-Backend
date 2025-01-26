import mongoose from 'mongoose';
import { MONGO_URI } from './serverConfig.js';

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to the database....');
    } catch (error) {
        console.log('Failed to connect to the database....');
    }
}

export default connectDB;