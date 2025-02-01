import * as express from "express"
import Joi from "joi";
import ApiError from "../error/api.error";
import { StatusCodes } from "http-status-codes";

export default function validate<T>(schema: Joi.ObjectSchema<T>): express.RequestHandler {
    return (req, _, next) => {
        const validationResult = schema.validate(req.body);
        const { error } = validationResult;
        if(!error) {
            return next();
        }

        const errors = error.details.map(detail => ({
            message: detail.message,
            path: detail.path,
            type: detail.type
        }));

        throw new ApiError(StatusCodes.BAD_REQUEST, {
            errors
        })
    }
}