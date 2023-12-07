import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { conn } from "./database/conn.js";
import cors from "cors";
dotenv.config();
const app = express();

import userRouter from "./router/userRouter.js";
import redirect from "./router/redirect.js";

//Middlewares
app.use(morgan("tiny"));

const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.60.127:3001", // Add your local IP here
];
app.use(express.json())
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);


app.use("/api", userRouter);
app.use("/", redirect);



conn(process.env.MONGO_STRING).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`The server is running at PORT number ${process.env.PORT}`);
  });
});
