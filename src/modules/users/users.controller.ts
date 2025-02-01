import { Request, Response, NextFunction } from "express";
import usersService, { UsersService } from "./users.service";
import { StatusCodes } from "http-status-codes";
import { transform, transformMany } from "./dtos/user.dto";
import ApiError from "../../error/api.error";
import { UpdateUserDTO } from "./dtos/update.user.dto";
import { CustomRequest, CustomResponse } from "../../types/custom";
import { IUserDocument } from "./users.model";

export class UsersController {
    constructor(private readonly users: UsersService) {}
    
    async get(req: Request<{}, {}, {}, { username?: string }>, res: CustomResponse, __: NextFunction) {
        const { query: { username } } = req;
        if(!username) {
            const users = await this.users.get();
            return res.sendSuccess(StatusCodes.OK, {
                users: transformMany(users)
            })
        }
    
        const user = await this.users.getByUsername(username);
        if(!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, {
                message: `user ${username} not found`
            })
        }

        return res.sendSuccess(StatusCodes.OK, {
            user: transform(user)
        })
    }

    async getByID(req: Request<{ id: string }>, res: CustomResponse, _: NextFunction) {
        const { params: { id } } = req;
        const user = await this.users.getByID(id);
        
        if(!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, {
                message: `user ${id} not found`
            })
        }

        return res.sendSuccess(StatusCodes.OK, {
            user: transform(user)
        });
    }

    async update(req: CustomRequest<{}, {}, UpdateUserDTO>, res: CustomResponse, _: NextFunction) {
        const { body: updateUserDTO } = req;
        const user = req.user as IUserDocument;

        const updatedUser = await this.users.update(user._id as string, updateUserDTO); 
        
        if(!updatedUser) {
            throw new ApiError(StatusCodes.NOT_FOUND, {
                message: `failed to update user ${user._id as string} data`
            })
        }

        return res.sendSuccess(StatusCodes.OK, {
            user: transform(updatedUser)
        })
    }


    async remove(req: CustomRequest, res: CustomResponse, _: NextFunction) {
        const user = req.user as IUserDocument;

        const removedUser = await this.users.remove(user._id as string);
        if(!removedUser) {
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, {
                message: `failed to remove the user ${user._id}`
            })
        }

        return res.sendSuccess(StatusCodes.OK, {
            user: transform(removedUser)
        })
    }
}


const usersController = new UsersController(usersService);
export default usersController;