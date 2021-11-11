import express, { Application, Request, Response } from "express";
import cors from 'cors';
import mongoose from "mongoose";
import baseRouter from "./routes";

require('dotenv').config();

const app: Application = express();
const port = process.env.PORT || 8000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", baseRouter);

app.get(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
      message: "Hello World!",
    });
  }
);

// db
mongoose
  .connect(process.env.DATABASE || "")
  .then(() => console.log('DB Connected'));

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${error.message}`);
}
