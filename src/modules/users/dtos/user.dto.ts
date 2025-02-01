import { IUserDocument } from "../users.model";

export interface UserDTO {
    id: string;
    username: string;
    email: string;
}

export function transform(user: IUserDocument): UserDTO {
    return {
        id: user._id as string,
        username: user.username, 
        email: user.password, 
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    } as UserDTO
}

export function transformMany(users: IUserDocument[]): UserDTO[] {
    return users.map(user => transform(user));
}