import express from "express";

const router = express.Router();

router.post("/signup", (req, res) => {
  res.send("User sign up");
});

router.get("/login", (req, res) => {
  res.send("User Login");
});

export default router;
