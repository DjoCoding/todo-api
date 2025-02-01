import mongoose from "mongoose";
import { config } from "dotenv";

config();


const DB_URI = process.env.DB_URI as string;
export default async function connectDB() {
    return mongoose.connect(DB_URI);
}