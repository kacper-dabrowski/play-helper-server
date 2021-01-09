import mongoose from "mongoose";

const Schema = mongoose.Schema;

const supportRequestSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export interface SupportRequestData extends mongoose.Document {
  title: string;
  description: string;
  department: string;
  content: string;
}

export default mongoose.model<SupportRequestData>(
  "SupportRequest",
  supportRequestSchema
);
