import jwt from "jsonwebtoken"
import { config } from "dotenv";

config();

export default interface IJWTPayload {
    username: string;
    id: string;
}

const secret = process.env.SECRET as string;

export const generate = (payload: IJWTPayload) => {
    const token = jwt.sign(payload, secret, {
        expiresIn: 3600 * 24
    });
    return token;
}

export const check = (token: string): IJWTPayload => {
    const payload = jwt.decode(token) as IJWTPayload;
    return payload;
}