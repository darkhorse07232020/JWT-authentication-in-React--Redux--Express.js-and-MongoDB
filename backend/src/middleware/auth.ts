import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) return res.status(403).send("Access denied.");

    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

export default authMiddleware;
