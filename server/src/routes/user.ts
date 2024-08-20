import express from 'express';
import * as userController from '../controllers/user';

const router = express.Router();

router.post('/', userController.createUserController);
router.get('/:id', userController.getUserByIdController);
router.get('/', userController.getUsersController);
router.put('/:id', userController.updateUserController);

export default router;
