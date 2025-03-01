import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./db/connection.js";
import { app, server } from "./socket/socket.connection.js";

dotenv.config();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//Import routes
import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";

//Routes declaration
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", messageRouter);

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 5000, () => {
      console.log(`SERVER SUCCESSFULLY RUNNING ON PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MONGO DB CONNECTION ERROR ${error}`);
  });
