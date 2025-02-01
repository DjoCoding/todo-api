import { Request, Response, NextFunction } from "express"
import todosService, { TodosService } from "./todos.service";
import { CustomRequest, CustomResponse } from "../../types/custom";
import { IUserDocument } from "../users/users.model";
import { StatusCodes } from "http-status-codes";
import { CreateTodoDto } from "./dtos/create.todo.dto";
import { UpdateTodoDto } from "./dtos/update.todo.dto";

export class TodosController {
    constructor(private readonly todos: TodosService) {}

    get = async (req: CustomRequest, res: CustomResponse, _: NextFunction) => {
        const user = req.user as IUserDocument;
        const todos = await this.todos.get(user._id as string);
        return res.sendSuccess(StatusCodes.OK, {
            todos
        })
    } 

    create = async (req: CustomRequest<{}, {}, CreateTodoDto>, res: CustomResponse, _: NextFunction) => {
        const { body: createTodoDto } = req;
        const user = req.user as IUserDocument;

        const isfound = await this.todos.getByTitle(user._id as string, createTodoDto.title);
        if(isfound) {
            return res.sendError(StatusCodes.CONFLICT, {
                message: `title ${createTodoDto.title} is already taken by used ${user._id as string}`
            })
        }

        const todo = await this.todos.create(user._id as string, createTodoDto);
        if(!todo) {
            return res.sendError(StatusCodes.INTERNAL_SERVER_ERROR, {
                message: `failed to create the todo`
            })
        }

        return res.sendSuccess(StatusCodes.CREATED, {
            todo
        })
    }


    update = async(req: CustomRequest<{ todoID: string }, {}, UpdateTodoDto>, res: CustomResponse, _: NextFunction) => {
        const { params: { todoID }, body: updateTodoDto } = req;
        const user = req.user as IUserDocument;

        if(updateTodoDto.title) {
            const isfound = await this.todos.getByTitle(user._id as string, updateTodoDto.title);
            if(isfound) {
                return res.sendError(StatusCodes.CONFLICT, {
                    message: `title ${updateTodoDto.title} is already taken by user ${user._id as string}`
                })
            }    
        }
        
        const todo = await this.todos.update(todoID, updateTodoDto);
        if(!todo) {
            return res.sendError(StatusCodes.INTERNAL_SERVER_ERROR, {
                message: `failed to update todo ${todoID}`
            })
        }

        return res.sendSuccess(StatusCodes.OK, {
            todo
        })
    }


    remove = async(req: CustomRequest<{ todoID: string }>, res: CustomResponse, _: NextFunction) => {
        const { params: { todoID } } = req;
        const todo = await this.todos.remove(todoID);
        if(!todo) {
            return res.sendError(StatusCodes.INTERNAL_SERVER_ERROR, {
                message: `failed to remove the todo ${todoID}`
            })
        }

        return res.sendSuccess(StatusCodes.OK, {
            todo
        })
    }
}

const todosController = new TodosController(todosService);
export default todosController;