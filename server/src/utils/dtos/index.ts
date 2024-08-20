import { User } from "../../models/User";

export interface LoginDTO {
    email: string;
    password: string;
}

export type CreateUserDTO = Omit<User,"id"|"created_at">
