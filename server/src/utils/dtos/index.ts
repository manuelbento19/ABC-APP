import { Empresa, User } from "../../models";

export interface LoginDTO {
    email: string;
    password: string;
}

export type CreateUserDTO = Omit<User,"id"|"created_at">
export type CreateEmpresaDTO = Omit<Empresa,"id"|"created_at">
