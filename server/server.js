import express from "express";
import dotenv from "dotenv";
import mainRouter from "./config/routes/main.js";
import connectDB from "./config/db/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use(cookieParser());

app.use(cors());
app.use("/", mainRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});
