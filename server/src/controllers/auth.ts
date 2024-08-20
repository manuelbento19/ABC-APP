import { Request, Response } from "express";
import { LoginDTO } from "../utils/dtos";
import { AuthService } from "../services/auth";

const authService = new AuthService();

export async function login(req: Request, res: Response) {
  const body: LoginDTO = req.body;
  try{
    if (!body?.email || !body?.password)
    return res.status(400).json({ error: "E-mail e Senha são obrigatórios" });
    
    const result = await authService.login(body);
    return res.json(result);
  }
  catch (error) {
    return res.status(500).json(error);
  }
}
  
export async function validate(req: Request, res: Response) {
  try{
    const token = req.headers.authorization;

    if (!token)
    return res.status(401).json({ error: "Token não fornecido" });
  
    const tokenWithoutBearer = token.replace("Bearer ", "");
    const result = await authService.validate(tokenWithoutBearer);
    return res.json(result);
  }
  catch (error) {
    return res.status(500).json(error);
  }
}