import { Router } from 'express';
import authMiddleware from '../../middleware/auth';
import { signInHandler, signUpHandler, autoLoginHandler, verifyUser, requestVerify, requestReset, resetPassword, signInWithGoogle } from './handler';

const authRouter = Router();

authRouter.post("/login", signInHandler);
authRouter.post("/autologin", authMiddleware, autoLoginHandler);
authRouter.post("/register", signUpHandler);
authRouter.post("/confirm/request", requestVerify);
authRouter.get("/confirm/:confirmationCode", verifyUser);
authRouter.post("/reset/request", requestReset);
authRouter.get("/reset/:confirmationCode/:password", resetPassword);
authRouter.post("/login/google", signInWithGoogle);

export default authRouter;