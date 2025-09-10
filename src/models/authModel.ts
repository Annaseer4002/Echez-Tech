import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string[];
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { 
        type: String,
        required: true,
        trim: true },

    email: { type: String,
          required: true, 
          trim: true, 
          unique: true },

    password: { type: String,
               required: true },
    role: {
      type: [String],
      enum: ["user", "admin", "instructor"],
      default: ["user"],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
