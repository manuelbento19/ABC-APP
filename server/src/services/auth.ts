import { database } from "../database";
import { User } from "../models/User";
import { LoginDTO } from "../utils/dtos";
import { TokenManager } from "../utils/helper/Token";
import { UserService } from "./user";

const tokenManager = new TokenManager();
const userService = new UserService();

export class AuthService {
  async login(data: LoginDTO) {
    const [rows] = await database.query<User[]>("SELECT * FROM Usuario WHERE email = ? AND password = ?",[data.email, data.password])

    if(rows.length==0)
    throw new Error("E-mail ou password incorrectas");

    const user = rows[0];
    const token = tokenManager.generate(JSON.stringify({ userId: user.id }));
    return {
      token,
      user,
    }
  }

  async validate(token: string) {
    const tokenWithoutBearer = token.replace("Bearer ", "");
    const decoded = JSON.parse(tokenManager.verify(tokenWithoutBearer))
  
    const userExists = await userService.getById(decoded.id);
    if(!userExists)
    throw new Error("Usuário não existe");
    
    return userExists;
  }
}