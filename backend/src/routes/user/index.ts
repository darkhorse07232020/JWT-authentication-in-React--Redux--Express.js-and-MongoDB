import { Router } from 'express';
import authMiddleware from '../../middleware/auth';
import { getUser } from './handler';

const userRouter = Router();

userRouter.get("/get", authMiddleware, getUser);

export default userRouter;