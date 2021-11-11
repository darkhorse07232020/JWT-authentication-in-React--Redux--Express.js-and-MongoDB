import { Router } from 'express';
import authRouter from './auth';
import userRouter from './user';

const baseRouter = Router();

baseRouter.use("/auth", authRouter);
baseRouter.use("/user", userRouter);

export default baseRouter;