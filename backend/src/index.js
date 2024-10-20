import express from "express";

const app = express();

//Import routes
import authRouter from "./routes/auth.routes.js";

//Routes declaration
app.use("api/v1/auth", authRouter);

app.listen(5000, () => {
  console.log(`SERVER SUCCESSFULLY RUNNING ON PORT 5000`);
});
