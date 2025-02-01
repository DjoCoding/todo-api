import mongoose from "mongoose";
import Todo, { ITodoSchema } from "./todos.model";
import { CreateTodoDto } from "./dtos/create.todo.dto";
import { UpdateTodoDto } from "./dtos/update.todo.dto";

export class TodosService {
    constructor(private readonly todosModel: mongoose.Model<ITodoSchema>) {}

    get = async (userID: string) => {
        const todos = await this.todosModel.find({
            userID
        });
        return todos;
    } 

    getByTitle = async (userID: string, title: string) => {
        const todo = await this.todosModel.findOne({
            userID, 
            title
        });
        return todo;
    }

    getByID = async (todoID: string) => {
        const todo = await this.todosModel.findById(todoID);
        return todo;
    }

    create = async (userID: string, createTodoDto: CreateTodoDto) => {
        const todo = await this.todosModel.create({
            userID,
            ...createTodoDto
        });
        return todo;
    }

    update = async (todoID: string, updateTodoDto: UpdateTodoDto) => {
        const todo = await this.todosModel.findByIdAndUpdate(todoID, updateTodoDto, { new: true });
        return todo;
    }

    remove = async (todoID: string) => {
        const todo = await this.todosModel.findByIdAndDelete(todoID);
        return todo;
    }
}

const todosService = new TodosService(Todo);
export default todosService;
