import { database } from "../database";
import { User } from "../models/User";
import { CreateUserDTO } from "../utils/dtos";
import { QueryBuilder } from "../utils/helper/QueryBuilder";

export class UserService {
    
   async create(data: CreateUserDTO) {
    const query = QueryBuilder.toCreate(data);
    const [rows] = await database.query<User[]>(`INSERT INTO Usuario (${query.columns}) VALUES (${query.signals})`,[query.values]);
    return rows
  }

  async getById(id: number) {
    const [rows] = await database.query<User[]>("SELECT * FROM Usuario WHERE id = ?", [id]);
    return rows[0];
  }

  async getAll() {
    const [rows] = await database.query<User[]>("SELECT * FROM Usuario");
    return rows;
  }

  async delete(id: number) {
    const [result] = await database.query<User[]>('DELETE FROM Usuario WHERE id = ?', [id]);
    return result;
  }
  async update(id: number,data: CreateUserDTO) {
    const query = QueryBuilder.toUpdate(data);
    const [rows] = await database.query<User[]>(`UPDATE Usuario SET ${query.columns} WHERE id=${id}`,[query.values]);
    return rows;
  }
}