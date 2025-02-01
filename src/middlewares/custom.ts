import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "../types/custom";

export default function setCustom() {
    return function (_: CustomRequest, res: CustomResponse, next: NextFunction) {
        res.sendSuccess = (code, data) => {
            res
            .status(code)
            .json({
                status: "success",
                data
            })
            .end();
        }

        res.sendError = (code, data) => {
            res 
            .status(code)
            .json({
                status: "error",
                data
            })
            .end();
        }

        next();
    }
}