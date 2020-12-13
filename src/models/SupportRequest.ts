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
});

interface SupportRequest extends mongoose.Document {
  title: string;
  description: string;
  department: string;
}

export default mongoose.model<SupportRequest>(
  "SupportRequest",
  supportRequestSchema
);
