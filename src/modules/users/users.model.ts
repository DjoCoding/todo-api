import mongoose from "mongoose";

export interface IUserSchema {
    username: string;
    email: string;
    isemailvalid: boolean;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserDocument extends IUserSchema, mongoose.Document {}

const userSchema = new mongoose.Schema<IUserSchema, IUserDocument>({
    username: { 
        type: String, 
        unique: true,
        trim: true,
        required: true,
    }, 
    email: {
        type: String, 
        trim: true,
        required: true,
        unique: true
    }, 
    isemailvalid: { 
        type: Boolean, 
        default: false
    },
    password: {
        type: String, 
        required: true,
    }
}, {
    timestamps: true
});

const User = mongoose.model<IUserSchema>("User", userSchema);

export default User;
