import { RowDataPacket } from "mysql2";

export type Empresa = {
    id?: number;
    nome: string;
    nif: string;
    proprietario_id: number;
    created_at?: Date;
    updated_at?: Date;
};

export type EmpresaResult = Empresa & RowDataPacket;