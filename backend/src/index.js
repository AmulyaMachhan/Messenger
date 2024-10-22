import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connection.js";

dotenv.config();

const app = express();

//Import routes
import authRouter from "./routes/auth.routes.js";

//Routes declaration
app.use("/api/v1/auth", authRouter);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5001, () => {
      console.log(`SERVER SUCCESSFULLY RUNNING ON PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MONGO DB CONNECTION ERROR ${error}`);
  });
