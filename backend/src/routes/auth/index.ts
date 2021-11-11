import { Router } from 'express';
import authMiddleware from '../../middleware/auth';
import { signInHandler, signUpHandler, autoLoginHandler } from './handler';

const authRouter = Router();

authRouter.post("/login", signInHandler);
authRouter.post("/autologin", authMiddleware, autoLoginHandler);
authRouter.post("/register", signUpHandler);

export default authRouter;