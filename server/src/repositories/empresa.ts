import { database } from "../database";
import { EmpresaResult } from "../models";
import { CreateEmpresaDTO } from "../utils/dtos";
import { QueryBuilder } from "../utils/helper/QueryBuilder";

export class EmpresaRepository{
  public static instance: EmpresaRepository;
  private constructor(){}

  public static getInstance(){
    if(!this.instance){
      this.instance = new EmpresaRepository;
    }
    return this.instance;
  }

  async create(data: CreateEmpresaDTO) {
    const query = QueryBuilder.toCreate(data);
    const [rows] = await database.query<EmpresaResult[]>(`INSERT INTO Empresa (${query.columns}) VALUES (${query.signals})`,[query.values]);
    return rows
  }
    
  async getById(id: number) {
    const [rows] = await database.query<EmpresaResult[]>("SELECT * FROM Empresa WHERE id = ?", [id]);
    return rows[0];
  }
    
  async getByProprietario(proprietario_id: string){
    const [rows] = await database.query<EmpresaResult[]>("SELECT * FROM Empresa WHERE proprietario_id = ?",[proprietario_id])
    return rows[0];
  }
  async getAll() {
    const [rows] = await database.query<EmpresaResult[]>("SELECT * FROM Empresa");
    return rows;
  }
    
  async delete(id: number) {
    const [result] = await database.query<EmpresaResult[]>('DELETE FROM Empresa WHERE id = ?', [id]);
    return result;
  }

  async update(id: number,data: CreateEmpresaDTO) {
    const query = QueryBuilder.toUpdate(data);
    const [rows] = await database.query<EmpresaResult[]>(`UPDATE Empresa SET ${query.columns} WHERE id=${id}`,[query.values]);
    return rows;
  }
}
