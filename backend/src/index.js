import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.connection.js";

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Import routes
import authRouter from "./routes/auth.routes.js";

//Routes declaration
app.use("/api/v1/auth", authRouter);

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 5000, () => {
      console.log(`SERVER SUCCESSFULLY RUNNING ON PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MONGO DB CONNECTION ERROR ${error}`);
  });
