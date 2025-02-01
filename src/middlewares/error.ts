import { NextFunction, Request, Response } from "express"
import ApiError from "../error/api.error"
import { StatusCodes } from "http-status-codes";

export default function error() {
    return (err: any, _: Request, res: Response, __: NextFunction) => {
        if(!(err instanceof ApiError)) {
            res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                status: "error",
                data: {
                    err
                }
            })
            .end();
            return;
        }
    
        const { message, errors } = err;
        if(errors) {
            res
            .status(err.code)
            .json({
                status: "error", 
                data: {
                    errors
                }
            })
            .end();
            return;
        }
    
        if(message) {
            res
            .status(err.code)
            .json({
                status: "error",
                data: { 
                    message
                }
            })
            .end();
            return;
        }
    
        res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            status: "error",
            data: {
                message: "Internal server error"
            }
        })
        .end();
    
    }
}