import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

try {
    if (!process.env.MONGODB_URI) {
        throw new Error('No mongodb uri found, provide it in env variables!');
    }

    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
} catch (error) {
    console.error('Failed to connect to the DB');
}
