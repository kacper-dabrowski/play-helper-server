import mongoose from "mongoose";

const schema = mongoose.Schema;

const supportRequestSchema = new schema({
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

export default mongoose.model("SupportRequest", supportRequestSchema);
