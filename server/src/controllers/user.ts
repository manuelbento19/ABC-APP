import { Request, Response } from "express";
import { UserService } from "../services/user";
import { CreateUserDTO } from "../utils/dtos";
import { UserRepository } from "../repositories/user";
import { AppError } from "../utils/helper/AppError";

const userRepository = UserRepository.getInstance();
const userService = new UserService(userRepository);

export async function createUserController(req: Request, res: Response) {
  const body: CreateUserDTO = req.body;
  try {
    const result = await userService.create(body);
    return res.status(201).json(result);
  } 
  catch (error) {
    if(error instanceof AppError)
    return res.status(error.statusCode).json({error: error.message});
    return res.status(500).json({error: "Erro da app"});
  }
}
  
export async function getUserByIdController(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  try {
    const userExists = await userService.getById(id);
    return res.json(userExists);
  }
  catch (error) {
    if(error instanceof AppError)
    return res.status(error.statusCode).json({error: error.message});
    return res.status(500).json({error: "Erro da app"});
  }
}
  
export async function getUsersController(_req: Request, res: Response) {
  try {
    const result = await userService.getAll();
    return res.json(result);
  } 
  catch (error) {
    if(error instanceof AppError)
    return res.status(error.statusCode).json({error: error.message});
    return res.status(500).json({error: "Erro da app"});
  }
}
  
export async function updateUserController(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const body: CreateUserDTO = req.body;
  try {
    const result = await userService.update(id,body);
    return res.json(result);
  }
  catch (error) {
    if(error instanceof AppError)
    return res.status(error.statusCode).json({error: error.message});
    return res.status(500).json({error: "Erro da app"});
  }
}