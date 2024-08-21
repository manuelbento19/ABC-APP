import express from "express";
import cors from "cors";
import morgan from 'morgan';
import { configuration } from "./config";
const PORT = configuration.server.port;

import authRouter from './routes/auth';
import userRouter from './routes/user';

const app = express();
app.use(cors());
app.use(morgan("tiny"))
app.use(express.json());

app.use("/auth",authRouter);
app.use("/user",userRouter);


app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});