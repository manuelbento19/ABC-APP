import { Request, Response } from "express";
import { EmpresaService, UserService } from "../services";
import { CreateEmpresaDTO } from "../utils/dtos";
import { UserRepository } from "../repositories/user";
import { EmpresaRepository } from "../repositories/empresa";
import { AppError } from "../utils/helper/AppError";

const userRepository = UserRepository.getInstance();
const empresaRepository = EmpresaRepository.getInstance();
const userService = new UserService(userRepository);
const empresaService = new EmpresaService(empresaRepository,userService);

export async function createEmpresaController(req: Request, res: Response) {
  const body: CreateEmpresaDTO = req.body;
  try {
    const result = await empresaService.create(body);
    return res.status(201).json(result);
  } 
  catch (error) {
    if(error instanceof AppError)
    return res.status(error.statusCode).json({error: error.message});
    return res.status(500).json({error: "Erro da app"});
  }
}
  
export async function getEmpresaByIdController(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  try {
    const empresaExists = await empresaService.getById(id);
    return res.json(empresaExists);
  }
  catch (error) {
    if(error instanceof AppError)
    return res.status(error.statusCode).json({error: error.message});
    return res.status(500).json({error: "Erro da app"});
  }
}
  
export async function getEmpresasController(_req: Request, res: Response) {
  try {
    const result = await empresaService.getAll()
    return res.json(result);
  } 
  catch (error) {
    res.status(500).json(error);
  }
}
  
export async function updateEmpresaController(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const body: CreateEmpresaDTO = req.body;
    try {
      const result = await empresaService.update(id,body);
      return res.json(result);
    }
    catch (error) {
      if(error instanceof AppError)
      return res.status(error.statusCode).json({error: error.message});
      return res.status(500).json({error: "Erro da app"});
    }
}