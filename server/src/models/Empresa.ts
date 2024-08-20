import { RowDataPacket } from "mysql2";

export interface IEmpresa extends RowDataPacket{
    id?: number;
    nome: string;
    nif: string;
    proprietario_id: number;
    created_at?: Date;
}