import core from "express-serve-static-core"
import { IUserDocument } from "../modules/users/users.model";
import * as express from "express"


export interface CustomResponse<ResBody = any>
extends express.Response<ResBody> {
    sendSuccess(code: number, data: any): void;
    sendError(code: number, data: any): void;
}

export interface CustomRequest<Params = core.ParamsDictionary, ResBody = any, ReqBody = any, Query = core.Query>
extends express.Request<Params, ResBody, ReqBody, Query> {
    user?: IUserDocument;
}