import { Request, Response } from "express";
import { database } from "../database";
import { UserService } from "../services/user";
import { CreateUserDTO } from "../utils/dtos";
import { User } from "../models";

const userService = new UserService();

export async function createUserController(req: Request, res: Response) {
    const body: CreateUserDTO = req.body;
    try {
      const result = await userService.create(body);
      return res.status(201).json(result);
    } 
    catch (error) {
      return res.status(500).json(error);
    }
}
  
export async function getUserByIdController(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const userExists = await userService.getById(id);
      if(!userExists) 
      return res.status(404).json({ error: "Usuário não encontrado" });
      
      return res.json(userExists);
    }
    catch (error) {
      return res.status(500).json(error);
    }
}
  
export async function getUsersController(_req: Request, res: Response) {
    try {
        const [users] = await database.query<User[]>("SELECT * FROM Usuario");
        return res.json(users);
    } 
    catch (error) {
      res.status(500).json(error);
    }
}
  
export async function updateUserController(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const body: CreateUserDTO = req.body;
    try {
      const userExists = await userService.getById(id);
      if(!userExists)
      return res.status(404).json({ error: "Usuário não encontrado" });
  
      const result = await userService.update(id,body);
      return res.json(result);
    }
    catch (error) {
      return res.status(500).json(error);
    }
}