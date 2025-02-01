import mongoose from "mongoose";
import User, { IUserSchema } from "./users.model";
import { CreateUserDTO } from "./dtos/create.user.dto";
import { UpdateUserDTO } from "./dtos/update.user.dto";

export class UsersService {
    constructor(private readonly userModel: mongoose.Model<IUserSchema>) {}
    
    async create(createUserDTO: CreateUserDTO) {
        const user = await this.userModel.create(createUserDTO);
        return user;
    }

    async get() {
        const users = await this.userModel.find();
        return users;
    }

    async getByID(id: string) {
        const user = await this.userModel.findById(id);
        return user;
    }

    async getByUsername(username: string) {
        const user = await this.userModel.findOne({ username });
        return user;
    }

    async update(id: string, updateUserDTO: UpdateUserDTO) {
        const user = await this.userModel.findByIdAndUpdate(id, updateUserDTO, { new: true });
        return user;
    }

    async remove(id: string) {
        const user = await this.userModel.findByIdAndDelete(id);
        return user;
    }
}

const usersService = new UsersService(User);
export default usersService;
