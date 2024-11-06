import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.router();

router.route("/send-message").post(authenticate, sendMessage);
router.route("/get-messages").post(authenticate, getMessages);
export default router;
