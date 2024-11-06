import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.router();

router.route("/send-message").post(authenticate, sendMessage);

export default router;
