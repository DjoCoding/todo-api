export interface CreateUserDTO {
    username: string;
    email: string;
    password: string;
    "confirm-password": string;
}