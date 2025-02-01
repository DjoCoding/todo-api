import { NextFunction, Response } from "express";
import { CustomRequest } from "../types/custom";
import { StatusCodes } from "http-status-codes";
import ApiError from "../error/api.error";
import { check } from "../utils/jwt";
import usersService from "../modules/users/users.service";

export default function protect() {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
        const headers = req.headers;
        const authorization = headers.authorization;
        if(!authorization) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, { 
                message: `could not find the authorization header`
            })
        }

        const token = authorization.split(" ")[1];
        if(!token) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, {
                message: `could not find the token in the auth header`
            })
        }

        const payload = check(token);
        if(!payload) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, {
                message: `invalid token in auth header`
            })
        }

        const user = await usersService.getByID(payload.id); 
        if(!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, {
                message: `failed to fetch user data ${payload.id}`
            })
        }

        req.user = user;
        next();
    }
}