import Joi from "joi"
import { CreateUserDTO } from "../users/dtos/create.user.dto"
import { LoginUserDto } from "./dtos/login.user.dto"

export const registerUserSchema = Joi.object<CreateUserDTO>({
    username: Joi.string().min(3).max(18).required().messages({
        "string.min": "username min length is 3", 
        "string.max": "username max length is 18",
        "any.required": "username is required"
    }), 
    email: Joi.string().email().required().messages({
        "string.email": "email must be an Email Address",
        "any.required": "email is required"
    }), 
    password: Joi.string().min(8).required().messages({
        "any.required": "password is required",
        "string.min": "password min length is 3"
    }), 
    "confirm-password": Joi.string().valid(Joi.ref("password")).required().messages({
        "any.required": "confirm password is required", 
        "any.only": "passwords do not match",
        "string.empty": "confirm password must not be empty"
    })
})

export const loginUserSchema = Joi.object<LoginUserDto>({
    username: Joi.string().min(3).max(18).required().messages({
        "string.min": "username min length is 3", 
        "string.max": "username max length is 18",
        "any.required": "username is required"
    }), 
    password: Joi.string().min(8).required().messages({
        "any.required": "password is required",
        "string.min": "password min length is 3"
    }), 
})