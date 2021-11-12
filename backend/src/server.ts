import express, { Application } from "express";
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

// db
mongoose
  .connect(process.env.DATABASE || "")
  .then(() => console.log('DB Connected'));

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occurred: ${error.message}`);
}
