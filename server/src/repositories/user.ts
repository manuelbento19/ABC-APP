import { database } from "../database";
import { UserResult } from "../models";
import { CreateUserDTO } from "../utils/dtos";
import { QueryBuilder } from "../utils/helper/QueryBuilder";

export class UserRepository{
    public static instance: UserRepository;

    private constructor(){}

    public static getInstance(){
        if(!this.instance){
            this.instance = new UserRepository;
        }
        return this.instance;
    }
    async create(data: CreateUserDTO) {
        const query = QueryBuilder.toCreate(data);
        const [rows] = await database.query<UserResult[]>(`INSERT INTO Usuario (${query.columns}) VALUES (${query.signals})`,[query.values]);
        return rows
      }
    
      async getById(id: number) {
        const [rows] = await database.query<UserResult[]>("SELECT * FROM Usuario WHERE id = ?", [id]);
        return rows[0];
      }
    
      async getByEmail(email: string){
        const [rows] = await database.query<UserResult[]>("SELECT * FROM Usuario WHERE email = ?",[email])
        return rows[0];
    
      }
      async getAll() {
        const [rows] = await database.query<UserResult[]>("SELECT * FROM Usuario");
        return rows;
      }
    
      async delete(id: number) {
        const [result] = await database.query<UserResult[]>('DELETE FROM Usuario WHERE id = ?', [id]);
        return result;
      }
      async update(id: number,data: CreateUserDTO) {
        const query = QueryBuilder.toUpdate(data);
        const [rows] = await database.query<UserResult[]>(`UPDATE Usuario SET ${query.columns} WHERE id=${id}`,[query.values]);
        return rows;
      }
}
