import express from 'express';
import * as authController from '../controllers/auth';

const router = express.Router();

router.post('/login', authController.login);
router.post('/validate', authController.validate);

export default router;
