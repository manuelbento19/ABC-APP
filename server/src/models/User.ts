import { RowDataPacket } from "mysql2";

enum Role  {
    Usuario,
    Empreendedor,
    Admin
}

export type User = {
    id?: number;
    nome: string;
    email: string;
    password: string;
    endereco?: string;
    provincia?: string;
    telefone: string;
    bi?: string;
    areaAtuacao?: string;
    role?: Role;
    created_at?: Date;
} & RowDataPacket;
