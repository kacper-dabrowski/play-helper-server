import mongoose from 'mongoose';

const connectToDb = async (): Promise<void> => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('No mongodb uri found, provide it in env variables!');
        }

        await mongoose.connect(process.env.MONGODB_URI, {});
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Failed to connect to the DB, details:${error.message}`);
        }
    }
};

export default connectToDb;
