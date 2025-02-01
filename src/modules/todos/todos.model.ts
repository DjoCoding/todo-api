import mongoose from "mongoose";

export interface ITodoSchema {
    title: string;
    content?: string;
    deadline?: Date;
    userID: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface ITodoDocument extends ITodoSchema, mongoose.Document {}

const todoSchema = new mongoose.Schema<ITodoSchema, ITodoDocument>({
    title: {
        type: String, 
        required: true,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    deadline: {
        type: Date
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
});

const Todo = mongoose.model<ITodoSchema>("Todo", todoSchema);

export default Todo;