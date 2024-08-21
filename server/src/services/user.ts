import { UserRepository } from "../repositories/user";
import { CreateUserDTO } from "../utils/dtos";
import { AppError } from "../utils/helper/AppError";

export class UserService {

  constructor(private userRepository: UserRepository){}

  async create(data: CreateUserDTO) {
    const userExists = await this.getByEmail(data.email);
    if(userExists)
    throw new AppError("Usuário já existe na App");

    const result = await this.userRepository.create(data);
    return result;
  }

  async getById(id: number) {
    const userExists = await this.userRepository.getById(id);
    if(!userExists)
    throw new AppError("Usuário não existe",404);
    return userExists;
  }

  async getByEmail(email: string){
    const user = await this.userRepository.getByEmail(email);
    if(!user)
    throw new AppError("Usuário não existe",404);
    return user;
  }
  async getAll() {
    const result = await this.userRepository.getAll();
    return result;
  }

  async delete(id: number) {
    const userExists = await this.getById(id);
    if(!userExists)
    throw new AppError("Usuário não existe",404);

    const result = await this.userRepository.delete(id);
    return result;
  }

  async update(id: number,data: CreateUserDTO) {
    const userExists = await this.getById(id);
    if(!userExists)
    throw new AppError("Usuário não existe",404);

    const result = await this.userRepository.update(id,data);
    return result;
  }
}