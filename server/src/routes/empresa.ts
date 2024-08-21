import express from 'express';
import * as empresaController from '../controllers/empresa';

const router = express.Router();

router.post('/', empresaController.createEmpresaController);
router.get('/:id', empresaController.getEmpresaByIdController);
router.get('/', empresaController.getEmpresasController);
router.put('/:id', empresaController.updateEmpresaController);

export default router;
