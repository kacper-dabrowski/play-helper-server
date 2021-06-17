import mongoose from 'mongoose';

const connectToDb = async (): Promise<typeof mongoose | undefined> => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('No mongodb uri found, provide it in env variables!');
        }

        return mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
        });
    } catch (error) {
        console.error('Failed to connect to the DB, details:' + error.message);
    }
};

export default connectToDb;
