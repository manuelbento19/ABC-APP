import { Role } from "../models";
import { EmpresaRepository } from "../repositories/empresa";
import { CreateEmpresaDTO } from "../utils/dtos";
import { AppError } from "../utils/helper/AppError";
import { UserService } from "./user";

export class EmpresaService {
  constructor(
    private empresaRepository: EmpresaRepository,
    private userService: UserService,
  ){}

  async create(data: CreateEmpresaDTO) {
    const proprietario = await this.userService.getById(data.proprietario_id);
    if(!proprietario)
    throw new AppError("Este utilizador não existe");
    
    if (proprietario.role !== Role.Empreendedor)
    throw new AppError("Apenas empreendedores podem criar empresas.");

    const result = await this.empresaRepository.create(data);
    return result;
  }

  async getById(id: number) {
    const empresaExists = await this.empresaRepository.getById(id);
    if(!empresaExists)
    throw new AppError("Empresa não existe",404);
    return empresaExists;
  }

  async getByProprietario(proprietario_id: string){
    const empresaExists = await this.empresaRepository.getByProprietario(proprietario_id);
    if(!empresaExists)
    throw new AppError("Empresa não existe",404);
    return empresaExists;
  }

  async getAll() {
    const result = await this.empresaRepository.getAll();
    return result;
  }

  async update(id: number,data: CreateEmpresaDTO) {
    const empresaExists = await this.empresaRepository.getById(id);
    if(!empresaExists)
    throw new AppError("Usuário não encontrado");

    const result = await this.empresaRepository.update(id,data);
    return result;
  }
}