import Joi from "joi";
import { CreateTodoDto } from "./dtos/create.todo.dto";
import { UpdateTodoDto } from "./dtos/update.todo.dto";

export const createTodoSchema = Joi.object<CreateTodoDto>({
    title: Joi.string().min(3).max(20).required().messages({
        "string.min": "todo title min length is 3",
        "string.max": "todo title max length is 20",
        "any.required": "todo title is required"
    }),
    content: Joi.string(),
    deadline: Joi.date()
})

export const updateTodoSchema = Joi.object<UpdateTodoDto>({
    title: Joi.string().min(3).max(20).messages({
        "string.min": "todo title min length is 3",
        "string.max": "todo title max length is 20"
    }),
    content: Joi.string(),
    deadline: Joi.date()
})
