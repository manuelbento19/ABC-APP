import { LoginDTO } from "../utils/dtos";
import { TokenManager } from "../utils/helper/Token";
import { UserService } from "./user";

export class AuthService {
  constructor(
    private userService: UserService,
    private tokenManager: TokenManager,
  ){ }

  async login(data: LoginDTO) {
    const userExists = await this.userService.getByEmail(data.email);

    if(!userExists)
    throw new Error("E-mail ou password incorrectas");

    if(userExists.password!==data.password)
    throw new Error("E-mail ou password incorrectas");

    const token = this.tokenManager.generate(JSON.stringify({ userId: userExists.id }));
    return {
      token,
      user: userExists,
    }
  }

  async validate(token: string) {
    const tokenWithoutBearer = token.replace("Bearer ", "");
    const decoded = JSON.parse(this.tokenManager.verify(tokenWithoutBearer))
  
    const userExists = await this.userService.getById(decoded.id);
    if(!userExists)
    throw new Error("Usuário não existe");
    
    return userExists;
  }
}