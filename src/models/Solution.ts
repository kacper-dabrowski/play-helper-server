import mongoose, { Document } from 'mongoose';

const { Schema } = mongoose;

const SolutionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
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
    content: string;
    isPublic: boolean;
    author: string;
}

export interface SolutionDto {
    _id: string;
    title: string;
    description: string;
    content: string;
    isPublic: boolean;
    isAuthor: boolean;
}

export const allowedUpdates = ['title', 'description', 'content', 'isPublic'];
export default mongoose.model<SolutionData>('Solution', SolutionSchema);
