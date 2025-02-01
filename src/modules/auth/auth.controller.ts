import { NextFunction } from "express";
import { CustomRequest, CustomResponse } from "../../types/custom";
import { usersService } from "../users/users.module"
import { UsersService } from "../users/users.service";
import { CreateUserDTO } from "../users/dtos/create.user.dto";
import { StatusCodes } from "http-status-codes";
import { transform } from "../users/dtos/user.dto";
import * as hasher from "../../utils/hasher"
import * as jwt from "../../utils/jwt"
import { LoginUserDto } from "./dtos/login.user.dto";


export class AuthController {
    constructor(private readonly users: UsersService) {}

    register = async (req: CustomRequest<{}, {}, CreateUserDTO>, res: CustomResponse, next: NextFunction) => {
        const { body: createUserDto } = req;
        
        const isfound = await this.users.getByUsername(createUserDto.username); 
        if(isfound) {
            return res.sendError(StatusCodes.CONFLICT, {
                message: `username ${createUserDto.username} is already taken`
            });
        }

        const password = await hasher.hash(createUserDto.password);
        const user = await this.users.create({
            ...createUserDto, 
            password
        } as CreateUserDTO);
        if(!user) {
            return res.sendError(StatusCodes.INTERNAL_SERVER_ERROR, {
                message: `failed to create the user ${createUserDto.username}`
            });
        }

        return res.sendSuccess(StatusCodes.CREATED, {
            user: transform(user)
        })
    }

    login = async (req: CustomRequest<{}, {}, LoginUserDto>, res: CustomResponse, next: NextFunction) => {
        const { body: loginUserDto } = req;
        
        const user = await this.users.getByUsername(loginUserDto.username);
        if(!user) {
            return res.sendError(StatusCodes.BAD_REQUEST, {
                message: `incorrect username or password`
            });
        }

        if(!await hasher.compare(loginUserDto.password, user.password)) {
            return res.sendError(StatusCodes.BAD_REQUEST, {
                message: `incorrect username or password`
            });
        }

        const token = jwt.generate({
            username: user.username, 
            id: user._id as unknown as string
        });
        
        return res.sendSuccess(StatusCodes.OK, {
            token,
            user: transform(user)
        })
    }
}

const authController = new AuthController(usersService);
export default authController;