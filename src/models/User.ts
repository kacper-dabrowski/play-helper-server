import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
  },
});

export interface User extends mongoose.Document {
  userId: string;
  username: string;
  password: string;
  fullName: string;
  isAdmin?: boolean;
}

export default mongoose.model<User>("User", userSchema);
