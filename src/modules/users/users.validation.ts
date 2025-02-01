import Joi from "joi";
import { UpdateUserDTO } from "./dtos/update.user.dto";


export const updateUserSchema = Joi.object<UpdateUserDTO>({
    username: Joi.string().min(3).max(18).messages({
        "string.min": "username min length is 3", 
        "string.max": "username max length is 18"
    }), 
    email: Joi.string().email().messages({
        "string.email": "email must be an Email Address"
    }), 
    password: Joi.string().min(8).messages({
        "string.min": "password min length is 3",
    }), 
    "confirm-password": Joi.string().valid(Joi.ref("password")).messages({
        "any.only": "passwords do not match",
        "string.empty": "confirm password must not be empty"
    })
})
