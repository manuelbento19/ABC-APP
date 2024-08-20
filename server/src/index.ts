import express from "express";
import cors from "cors";
import morgan from 'morgan';
import { configuration } from "./config";

import authRouter from './routes/auth';
import userRouter from './routes/user';

const app = express();
app.use(cors());
app.use(morgan("tiny"))
app.use(express.json());

app.use("/auth",authRouter);
app.use("/user",userRouter);

const PORT = configuration.server.port;

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});