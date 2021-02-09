import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

const SolutionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    man: {
        type: String,
        required: true,
    },
    woman: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

export interface SolutionData extends Document {
    title: string;
    description: string;
    man: string;
    woman: string;
    company: string;
    isPublic: boolean;
    author: string;
}

export const allowedUpdates = ['title', 'description', 'man', 'woman', 'company', 'isPublic'];
export default mongoose.model<SolutionData>('Solution', SolutionSchema);
